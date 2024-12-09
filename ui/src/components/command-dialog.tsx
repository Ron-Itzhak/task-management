"use client";
import { Search } from "lucide-react";
import * as React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useTasks } from "@/app/contexts/tasks-context";
export function CommandDialogSearch() {
  const router = useRouter();
  const { tasks } = useTasks();

  const [open, setOpen] = React.useState(false);

  //get suggestions
  const getTasks = (categoryId: string) =>
    tasks.filter((task) => task.categoryId === categoryId);

  return (
    <>
      <Button
        className="relative w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64"
        variant="outline"
        onClick={() => setOpen((open) => !open)}
      >
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        Search
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {tasks.map((task) => (
              <CommandItem
                key={task.id}
                value={task.title}
                onSelect={() => router.push(`/tasks/${task.id}`)}
              >
                {task.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
