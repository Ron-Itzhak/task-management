"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { useTasks } from "@/app/contexts/tasks-context";
import { useCategories } from "@/app/contexts/categories-context";
import { Priority, Status } from "../enums";
import { Task } from "../types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import SpinnerIcon from "@/components/spinner-icon";

interface formProps {
  createMode: boolean;
  task?: Task;
}
export function TaskForm({ createMode, task }: formProps) {
  const [isCreate] = useState(createMode);

  const { createTask, updateTask } = useTasks();
  const { categories } = useCategories();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(!createMode);

  const FormSchema = z.object({
    title: z
      .string()
      .min(1, { message: "Task title is required" })
      .max(100, { message: "Task title must be less than 100 characters" }),
    description: z.string().optional(),
    categoryId: z.string().nullable().optional(),
    priority: z.nativeEnum(Priority).default(Priority.Medium),
    status: z.nativeEnum(Status).default(Status.Backlog),
    dueDate: z.date().optional(),
  });

  const defaultValues = task
    ? {
        title: task.title,
        description: task.description,
        priority: task.priority,
        categoryId: task.categoryId,
        status: task.status,
        dueDate: new Date(task.dueDate!),
      }
    : {
        title: "",
        description: "",
        priority: Priority.Medium,
        status: Status.Backlog,
        dueDate: new Date(),
      };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    try {
      if (isCreate) {
        const transformedData = {
          ...data,
          dueDate:
            data.dueDate instanceof Date
              ? data.dueDate.toISOString()
              : data.dueDate,
        };

        const status = await createTask(transformedData as Task);

        if (status === 201) {
          toast({
            title: "Task added",
            description: `Task "${data.title}" created successfully.`,
          });
          form.reset();
        } else {
          toast({ title: "Error", description: "Failed to add task." });
        }
      } else {
        if (task) {
          const status = await updateTask({
            ...data,
            id: task.id,
          } as Task);
          const toastMessage =
            status === 200
              ? `Updated Task successfully`
              : `Failed to update Task`;
          toast({
            title: toastMessage,
            description: `Task : ${data.title} `,
          });
        }
      }
    } catch (error) {
      console.error("Error submitting task:", error);
      toast({ title: "Error", description: "An unexpected error occurred." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Task Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Title</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter task title"
                  {...field}
                  className="resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isExpanded && (
          <>
            {/* Task Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Optional: Add task description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category Selector */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value as string}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectGroup>
                      <SelectContent>
                        {/* <SelectItem value={null}>No Category</SelectItem> */}
                        {categories.length > 0 &&
                          categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </SelectGroup>
                  </Select>
                  <FormDescription>
                    Choose a category for the task (optional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Priority Selector */}
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(Priority).map((priority) => (
                        <SelectItem
                          key={priority}
                          value={priority}
                          className="capitalize"
                        >
                          {priority}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Status Selector */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(Status).map((priority) => (
                        <SelectItem
                          key={priority}
                          value={priority}
                          className="capitalize"
                        >
                          {/* {priority.charAt(0).toUpperCase() + priority.slice(1)} */}
                          {priority}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Date Picker */}

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {/* Expand/Collapse Button */}
        {isCreate && (
          <div className="flex justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Collapse" : "Expand"}
            </Button>
          </div>
        )}
        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isCreate ? "Add Task" : "Edit Task"}
          {isSubmitting && <SpinnerIcon></SpinnerIcon>}
        </Button>
      </form>
    </Form>
  );
}
