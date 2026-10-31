import { useNetworkState } from "expo-network";
import { useQueue, QueueItem } from "./queue";
import { useSQLiteContext } from "expo-sqlite";
import { Operation } from "../types/migration";
import { useNotes } from "../db/useNotes";
import {
  createNoteOnBackend,
  updateNoteOnBackend,
  deleteNoteOnBackend,
} from "../api/notesApi";
import useSettingsStore from "../store/settingsStore";

export const useSync = () => {
  const networkState = useNetworkState();
  const db = useSQLiteContext();
  const { changeStatusToSynced } = useNotes();
  const { getQueue, popQueue, incrementRetryCounter } = useQueue();

  const { wifiOnly, autoSync } = useSettingsStore();

  const canSync =
    networkState.isConnected &&
    networkState.isInternetReachable &&
    (!wifiOnly || networkState.type === "WIFI");
  // Process ONE queue item
  const processQueueItem = async (item: QueueItem) => {
    try {
      const payload = item.payload ? JSON.parse(item.payload) : null;

      switch (item.operation) {
        case Operation.CREATE:
          await createNoteOnBackend(payload);
          break;

        case Operation.UPDATE:
          await updateNoteOnBackend(item.noteId, payload);
          break;

        case Operation.DELETE:
          await deleteNoteOnBackend(item.noteId);
          break;
      }

      // Backend success
      await db.withTransactionAsync(async () => {
        if (
          item.operation === Operation.CREATE ||
          item.operation === Operation.UPDATE
        ) {
          await changeStatusToSynced(item.noteId);
        }
        await popQueue(item.id);
      });

      return true;
    } catch (error) {
      console.log(`Sync failed for queue item ${item.id}`, error);

      return false;
    }
  };

  const sync = async () => {
    if (!canSync) {
      return;
    }

    const queue = await getQueue();

    for (const item of queue) {
      const success = await processQueueItem(item);

      if (!success) {
        await incrementRetryCounter(item.id);
      }
    }
  };

  return {
    sync,
    canSync,
  };
};
