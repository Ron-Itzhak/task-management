"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Task } from "../tasks/types";

interface TasksContextType {
  tasks: Task[];
  createTask: (newTask: Task) => Promise<number>;
  deleteTask: (idOrIds: string | string[]) => Promise<number>;
  updateTask: (updatedTask: Task) => Promise<number>;
  isLoading: boolean;
  isSubmitting: boolean;
  submitError: string | null;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API;

  const [isLoading, setIsLoading] = useState(true);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/tasks`);
      const result = await response.json();
      if (response.ok) {
        const tasksData: Task[] = result.data;
        setTasks(tasksData);
      }
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (newTask: Task) => {
    try {
      setIsSubmitting(true);
      const url = `${apiUrl}/tasks`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        const result = await response.json();
        const id = result.data.insertedId;
        setTasks((prevTasks) => [...prevTasks, { ...newTask, id }]);
      }
      return response.status;
    } catch (error: any) {
      console.error("Failed to create task:", error);
      setSubmitError(error.message);
      return 500;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateTask = async (updatedTask: Task) => {
    try {
      setIsSubmitting(true);

      const { id, ...rest } = updatedTask;
      console.log(updatedTask);

      const url = `${apiUrl}/tasks/${updatedTask.id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rest),
      });
      if (response.ok) {
        const result = await response.json();
        const updatedFromServer = result.data;
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedTask.id
              ? { ...task, ...updatedFromServer }
              : task
          )
        );
      }
      return response.status;
    } catch (error: any) {
      console.error("Failed to update task:", error);
      setSubmitError(error.message);
      return 500;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteTask = async (idOrIds: string | string[]) => {
    try {
      if (typeof idOrIds === "string") {
        const url = `${apiUrl}/tasks/${idOrIds}`;
        const response = await fetch(url, { method: "DELETE" });
        if (response.ok) {
          setTasks((prevTasks) =>
            prevTasks.filter((task) => task.id !== idOrIds)
          );
        }
        return response.status;
      } else {
        const url = `${apiUrl}/tasks/bulkDelete`;
        const response = await fetch(url, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: idOrIds }),
        });
        if (response.ok) {
          setTasks((prevTasks) =>
            prevTasks.filter((task) => !idOrIds.includes(task.id))
          );
        }
        return response.status;
      }
    } catch (error: any) {
      console.error("Failed to delete task(s):", error);
      setSubmitError(error.message);
      return 500;
    }
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        createTask,
        deleteTask,
        updateTask,
        isLoading,
        isSubmitting,
        submitError,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};
