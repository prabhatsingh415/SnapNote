import { useCallback } from "react";
import { useSQLiteContext } from "expo-sqlite";
import * as Crypto from "expo-crypto";
import { Operation, SyncStatus } from "../types/migration";
import { useQueue } from "../sync/queue";
import { Note } from "../types/note";

type StoredNote = Omit<Note, "pinned"> & { pinned: number };

const mapNote = (note: StoredNote): Note => ({
  ...note,
  pinned: note.pinned === 1,
});

export const useNotes = () => {
  const db = useSQLiteContext();
  const { pushQueue } = useQueue();

  // CREATE
  const createNote = async (note: {
    title: string;
    imageUri?: string;
    description?: string;
  }) => {
    const id = Crypto.randomUUID();
    const now = Date.now();

    const payload = JSON.stringify({
      id,
      title: note.title,
      imageUri: note.imageUri ?? null,
      description: note.description ?? null,
      createdAt: now,
      updatedAt: now,
    });

    await db.withTransactionAsync(async () => {
      // Save note locally
      await db.runAsync(
        `INSERT INTO notes
          (id, title, imageUri, description, status, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        id,
        note.title,
        note.imageUri ?? null,
        note.description ?? null,
        SyncStatus.PENDING,
        now,
        now
      );

      // Add operation to sync queue
      await pushQueue({
        noteId: id,
        operation: Operation.CREATE,
        payload,
      });
    });

    return id;
  };

  // READ ALL
  const getNotes = useCallback(async (): Promise<Note[]> => {
    const notes = await db.getAllAsync<StoredNote>(
      `SELECT *
       FROM notes
       ORDER BY createdAt DESC`
    );
    return notes.map(mapNote);
  }, [db]);

  // READ ONE
  const getNoteById = useCallback(async (id: string): Promise<Note | null> => {
    const note = await db.getFirstAsync<StoredNote>(
      `SELECT *
       FROM notes
       WHERE id = ?`,
      id
    );

    return note ? mapNote(note) : null;
  }, [db]);

  const setPinned = async (id: string, pinned: boolean) => {
    await db.runAsync(
      `UPDATE notes
       SET pinned = ?
       WHERE id = ?`,
      pinned ? 1 : 0,
      id
    );
  };

  // UPDATE
  const updateNote = async (
    id: string,
    note: {
      title: string;
      imageUri?: string;
      description?: string;
    }
  ) => {
    const updatedAt = Date.now();

    const payload = JSON.stringify({
      id,
      title: note.title,
      imageUri: note.imageUri ?? null,
      description: note.description ?? null,
      updatedAt,
    });

    await db.withTransactionAsync(async () => {
      await db.runAsync(
        `UPDATE notes
         SET
           title = ?,
           imageUri = ?,
           description = ?,
           status = ?,
           updatedAt = ?
         WHERE id = ?`,
        note.title,
        note.imageUri ?? null,
        note.description ?? null,
        SyncStatus.PENDING,
        updatedAt,
        id
      );

      await pushQueue({
        noteId: id,
        operation: Operation.UPDATE,
        payload,
      });
    });
  };

  // DELETE
  const deleteNote = async (id: string) => {
    await db.withTransactionAsync(async () => {
      await db.runAsync(
        `DELETE FROM notes
         WHERE id = ?`,
        id
      );

      await pushQueue({
        noteId: id,
        operation: Operation.DELETE,
        payload: null,
      });
    });
  };

  const changeStatusToSynced = async (id: string) => {
    await db.runAsync(
      `UPDATE notes
             SET status = ?
             WHERE id = ?`,
      SyncStatus.SYNCED,
      id
    );
  };

  return {
    createNote,
    getNotes,
    getNoteById,
    setPinned,
    updateNote,
    deleteNote,
    changeStatusToSynced,
  };
};
