import { Suspense } from "react";
import TaskDetailSkeleton from "../components/task-details-skeleton";
import TaskInfo from "../task-info";
import { Task } from "../types";
async function getTask(id: string): Promise<Task> {
  const apiUrl = process.env.INTERNAL_API;
  const url = `${apiUrl}/tasks/${id}`;
  console.log(url);

  const response = await fetch(url);
  const result = await response.json();
  return result;
}

export default async function TaskPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const task = await getTask(id);
  return (
    <div className="container mx-auto p-4">
      <Suspense fallback={<TaskDetailSkeleton />}>
        <TaskInfo task={task}></TaskInfo>
      </Suspense>
    </div>
  );
}
