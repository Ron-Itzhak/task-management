import { TaskForm } from "./tasks/components/task-form";

export default function Home() {
  return (
    <main>
      <div className="flex items-center justify-center  bg-background ">
        <div className="max-w-2xl w-full p-4">
          <h1 className="text-2xl font-bold mb-4 text-center	">
            Drop your thoughts or tasks here
          </h1>
          <TaskForm createMode={true}></TaskForm>
        </div>
      </div>
    </main>
  );
}
