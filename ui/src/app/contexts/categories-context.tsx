"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Category {
  id: string;
  name: string;
  description?: string;
}

interface CategoriesContextType {
  categories: Category[];
  createCategory: (newCategory: Category) => Promise<number>;
  updateCategory: (updatedCategory: Category) => Promise<number>;
  deleteCategory: (id: string) => Promise<number>;
  isLoading: boolean;
  isSubmitting: boolean;
  submitError: string | null;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(
  undefined
);

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API;

  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/categories`);
      const result = await response.json();
      if (response.ok) {
        setCategories(result.data as Category[]);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const createCategory = async (newCategory: Category) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`${apiUrl}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });
      if (response.ok) {
        const result = await response.json();
        const id = result.data.insertedId;

        setCategories((prevCategories) => [
          ...prevCategories,
          { ...newCategory, id },
        ]);
        return response.status;
      }
      return response.status;
    } catch (error: any) {
      console.error("Failed to create category:", error);
      setSubmitError(error.message);
      return 500;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateCategory = async (updatedCategory: Category) => {
    try {
      setIsSubmitting(true);
      const { id, name, description } = updatedCategory;
      const response = await fetch(`${apiUrl}/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });
      if (response.ok) {
        const result = await response.json();
        const updatedFromServer = result.data;

        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.id === updatedCategory.id
              ? { ...updatedCategory, ...updatedFromServer }
              : category
          )
        );
        return response.status;
      }
      return response.status;
    } catch (error: any) {
      console.error("Failed to update category:", error);
      setSubmitError(error.message);
      return 500;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`${apiUrl}/categories/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== id)
        );
        return response.status;
      }
      return response.status;
    } catch (error: any) {
      console.error("Failed to delete category:", error);
      setSubmitError(error.message);
      return 500;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        createCategory,
        updateCategory,
        deleteCategory,
        isLoading,
        isSubmitting,
        submitError,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }
  return context;
};
