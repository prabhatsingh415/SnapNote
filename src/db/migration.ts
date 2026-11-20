import { SQLiteDatabase } from "expo-sqlite";

export const DATABASE_VERSION = 2;

export async function migrateDB(db: SQLiteDatabase) {
  const result = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version"
  );

  let currentDBVersion = result?.user_version ?? 0;

  if (currentDBVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDBVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;

      CREATE TABLE IF NOT EXISTS notes (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        imageUri TEXT,
        status TEXT NOT NULL DEFAULT 'pending'
          CHECK (status IN ('pending', 'synced')),
        createdAt INTEGER NOT NULL,
        updatedAt INTEGER NOT NULL,
        pinned INTEGER NOT NULL DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS sync_queue (
        id TEXT PRIMARY KEY NOT NULL,
        noteId TEXT NOT NULL,
        operation TEXT NOT NULL
          CHECK (operation IN ('CREATE', 'UPDATE', 'DELETE')),
        payload TEXT,
        createdAt INTEGER NOT NULL,
        retryCount INTEGER NOT NULL DEFAULT 0
      );

      CREATE INDEX IF NOT EXISTS idx_sync_queue_createdAt
      ON sync_queue(createdAt);
    `);

    currentDBVersion = 1;
  }

  const noteColumns = await db.getAllAsync<{ name: string }>(
    "PRAGMA table_info(notes)"
  );
  if (!noteColumns.some((column) => column.name === "pinned")) {
    await db.execAsync(
      "ALTER TABLE notes ADD COLUMN pinned INTEGER NOT NULL DEFAULT 0"
    );
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
