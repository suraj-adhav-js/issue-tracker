import { z } from "zod";

export const issueSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(255, "Title is too long"),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(5000, "Description is too long"),
});

export const patchIssueSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(255, "Title is too long")
    .optional(),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(5000, "Description is too long")
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedId is required.")
    .max(255)
    .optional()
    .nullable()
});
