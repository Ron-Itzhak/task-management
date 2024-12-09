import { Metadata } from "next";

import { columns } from "./table/components/columns";
import { DataTable } from "./table/components/data-table";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

export default async function TaskPage() {
  return (
    <div className="flex h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tasks</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks!
          </p>
        </div>
        <div className="flex items-center space-x-2"></div>
      </div>
      <DataTable columns={columns} />
    </div>
  );
}
