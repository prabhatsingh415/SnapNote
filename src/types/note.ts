import { SyncStatus } from "./migration";

export interface Note {
  id: string;
  title: string;
  imageUri?: string;
  description?: string;
  pinned: boolean;
  status: SyncStatus;
  createdAt: number;
  updatedAt: number;
}
