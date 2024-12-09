"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";

import { useCategories } from "@/app/contexts/categories-context";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CategoryForm } from "./category-form";
import { useTasks } from "@/app/contexts/tasks-context";

export default function CategoryGrid() {
  const { categories, deleteCategory, isLoading } = useCategories();
  const { tasks } = useTasks();
  const [editingId, setEditingId] = useState<string | null>(null);
  const getTaskCount = (categoryId: string) =>
    tasks.filter((task) => task.categoryId === categoryId).length;
  if (isLoading) {
    return <p>Loading categories...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Card key={category.id} className="flex flex-col">
          <CardHeader className="flex-grow">
            <CardTitle className="flex items-center justify-between">
              {editingId === category.id ? (
                <CategoryForm
                  createMode={false}
                  category={category}
                ></CategoryForm>
              ) : (
                <>
                  <span>{category.name}</span>
                  <Badge variant="secondary">
                    {" "}
                    {getTaskCount(category.id)} tasks
                  </Badge>
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>{category.description}</CardContent>
          <CardFooter className="flex justify-between">
            {editingId === category.id && (
              <Button
                variant="outline"
                className="flex-grow mr-2"
                onClick={() => {
                  setEditingId(null);
                }}
              >
                Close Edit
              </Button>
            )}
            {editingId !== category.id && (
              <Button
                onClick={() => {
                  setEditingId(category.id);
                }}
                size="icon"
                variant="outline"
              >
                Edit
              </Button>
            )}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon" className="ml-2">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the "{category.name}" category.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteCategory(category.id)}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      ))}

      {/* Add New Category */}
      <Card className="flex flex-col justify-center items-center p-6">
        <CardContent>
          <CategoryForm createMode={true}></CategoryForm>
        </CardContent>
      </Card>
    </div>
  );
}
