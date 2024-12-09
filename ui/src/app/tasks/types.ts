import { Priority, Status } from "./enums";

export interface Task {
  id: string; // Unique identifier, typically MongoDB ObjectId as a string
  title: string; // Task description
  description?: string; // Optional detailed notes
  dueDate?: string; // ISO string representing the deadline
  priority: Priority; // Priority level ('low', 'medium', 'high')
  status: Status; // Current state ('backlog', 'todo', 'in progress', 'done', 'canceled')
  categoryId?: string; // Optional category or project ID as string (MongoDB ObjectId)
  labels?: string[]; // Additional labels or keywords
  createdAt?: string; // ISO string for the creation date
  updatedAt?: string; // Optional ISO string for the last update date
}
