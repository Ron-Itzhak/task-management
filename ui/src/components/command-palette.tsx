"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

type Task = {
  id: string;
  title: string;
};

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [tasks, setTasks] = React.useState<Task[]>([]);

  const fetchTasks = React.useCallback(async (query: string) => {
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    const mockTasks: Task[] = [
      { id: "1", title: "Complete project proposal" },
      { id: "2", title: "Review team performance" },
      { id: "3", title: "Prepare for client meeting" },
      { id: "4", title: "Update website content" },
      { id: "5", title: "Finalize budget report" },
    ];
    return mockTasks.filter((task) =>
      task.title.toLowerCase().includes(query.toLowerCase())
    );
  }, []);

  React.useEffect(() => {
    if (open) {
      fetchTasks(value).then(setTasks);
    }
  }, [open, value, fetchTasks]);

  return (
    <div className="relative w-full">
      <Command className="rounded-lg border">
        <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
          <CommandInput
            placeholder="Search tasks... s"
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 200)}
            onValueChange={(search) => setValue(search)}
          />
          {value && (
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </div>
      </Command>
      {open && (
        <div className="absolute mt-2 w-full z-50">
          <Command className="rounded-lg border shadow-md">
            <CommandList className="max-h-[300px] overflow-y-auto">
              <CommandEmpty>No tasks found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                {tasks.map((task) => (
                  <CommandItem
                    key={task.id}
                    onSelect={() => {
                      setValue(task.title);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === task.title ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {task.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
}
