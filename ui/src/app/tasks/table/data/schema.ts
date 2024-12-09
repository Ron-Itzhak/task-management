import { z } from "zod";
import { Priority, Status } from "../../enums";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.

const start = {
  id: z.string(),
  title: z.string(),
  status: z.string(),
  categoryId: z.string().optional(),
  priority: z.string(),
  description: z.string(),
};

const t = {
  id: z.string(),
  title: z
    .string()
    .min(1, { message: "Task title is required" })
    .max(100, { message: "Task title must be less than 100 characters" }),
  description: z.string().optional(),
  categoryId: z.string().nullable().optional(),
  priority: z.nativeEnum(Priority).default(Priority.Medium),
  status: z.nativeEnum(Status).default(Status.Backlog),
  dueDate: z.union([z.string(), z.date()]).optional(),
};
export const taskSchema = z.object(t);

export type Task = z.infer<typeof taskSchema>;
