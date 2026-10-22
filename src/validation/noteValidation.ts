import { z } from "zod";

export const noteSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .min(3, "Description must be at least 3 characters")
    .max(1000, "Description cannot exceed 1000 characters"),
});
