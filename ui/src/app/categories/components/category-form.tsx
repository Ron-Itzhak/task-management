"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Category, useCategories } from "@/app/contexts/categories-context";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Edit, Plus } from "lucide-react";
import SpinnerIcon from "@/components/spinner-icon";
interface formProps {
  createMode: boolean;
  category?: Category;
}
export function CategoryForm({ createMode, category }: formProps) {
  const [isCreate] = useState(createMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createCategory, updateCategory } = useCategories();

  const FormSchema = z.object({
    name: z
      .string()
      .min(1, { message: "Category name is required" })
      .max(100, { message: "Category name must be less than 100 characters" }),
    description: z.string().optional(),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);

    try {
      if (isCreate) {
        const status = await createCategory(data as Category);

        const toastMessage =
          status === 201
            ? `Category added successfully`
            : `Failed to add Category`;
        toast({
          title: toastMessage,
          description: `Category : ${data.name} `,
        });
      } else {
        if (category) {
          const status = await updateCategory({
            ...data,
            id: category.id,
          } as Category);
          const toastMessage =
            status === 200
              ? `Updated Category successfully`
              : `Failed to update Category`;
          toast({
            title: toastMessage,
            description: `Category : ${data.name} `,
          });
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      if (isCreate) form.reset(defaultValues);

      setIsSubmitting(false);
    }
  }

  const defaultValues = category ? category : { name: "", description: "" };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="New Category Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Optional Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting && <SpinnerIcon />}
          {isCreate && <Plus className="mr-2 h-4 w-4" />}
          {!isCreate && <Edit className="mr-2 h-4 w-4" />}
        </Button>
      </form>
    </Form>
  );
}
