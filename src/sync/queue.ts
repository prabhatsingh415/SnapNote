import { useSQLiteContext } from "expo-sqlite";
import * as Crypto from "expo-crypto";
import { Operation } from "../types/migration";

interface NoteParam {
  noteId: string;
  operation: Operation;
  payload: string | null;
}
export interface QueueItem {
  id: string;
  noteId: string;
  operation: Operation;
  payload: string | null;
  createdAt: number;
  retryCount: number;
}

export const useQueue = () => {
  const db = useSQLiteContext();

  const pushQueue = async ({ noteId, operation, payload }: NoteParam) => {
    const id = Crypto.randomUUID();
    const now = Date.now();

    await db.runAsync(
      `INSERT INTO sync_queue
        (id, noteId, operation, payload, createdAt, retryCount)
       VALUES (?, ?, ?, ?, ?, ?)`,
      id,
      noteId,
      operation,
      payload,
      now,
      0
    );

    return id;
  };

  const popQueue = async (id: string) => {
    await db.runAsync(
      `DELETE FROM sync_queue
       WHERE id = ?`,
      id
    );
  };
  const getQueue = async (): Promise<QueueItem[]> => {
    return await db.getAllAsync<QueueItem>(
      `SELECT *
     FROM sync_queue
     ORDER BY createdAt ASC`
    );
  };

  const incrementRetryCounter = async (id: string) => {
    await db.runAsync(
      `UPDATE sync_queue SET retryCount = retryCount + 1 WHERE id = ?`,
      id
    );
  };

  return {
    pushQueue,
    popQueue,
    getQueue,
    incrementRetryCounter,
  };
};
