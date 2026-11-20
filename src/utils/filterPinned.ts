import { Note } from "../types/note";

export const filterPinned = (notes: Note[]) =>
  notes.filter((note) => note.pinned);
