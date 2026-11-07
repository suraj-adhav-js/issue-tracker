import { z } from "zod";

export const createIssueSchema = z.object({
  title: z
    .string("Title is required")
    .trim()
    .min(1, "Title is required")
    .max(255, "Title is too long"),
  description: z
    .string("Description is required")
    .trim()
    .min(1, "Description is required")
    .max(5000, "Description is too long"),
});
