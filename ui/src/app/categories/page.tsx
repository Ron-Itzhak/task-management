import CategoryGrid from "./components/category-layout";

export default function CategoriesPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>
      <CategoryGrid />
    </div>
  );
}
