import { SyncStatus } from "./migration";

export interface Note {
  id: string;
  title: string;
  imageUri?: string;
  description?: string;
  status: SyncStatus;
  createdAt: number;
  updatedAt: number;
}
