import { Priority, Status } from './enums';

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: Priority;
  status: Status;
  categoryId?: string;
  labels?: string[];
  createdAt?: string;
  updatedAt?: string;
}
