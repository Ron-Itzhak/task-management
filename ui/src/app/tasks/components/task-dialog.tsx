"use client";
import { Plus } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskForm } from "./task-form";

export function TaskDialog() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen((open) => !open)}>
        <Plus className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        Add task
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add task</DialogTitle>
            <DialogDescription>
              Make changes to add task or fill later
            </DialogDescription>
          </DialogHeader>
          <TaskForm createMode={true}></TaskForm>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default TaskDialog;
