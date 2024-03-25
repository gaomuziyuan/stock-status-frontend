import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function AdminKanbanBoardLoading() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <div
        className="inline-block size-6 border-[3px] border-current border-t-transparent text-primary-600-600 rounded-full dark:text-primary-500"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Dashboard DataCard Loading ...</span>
      </div>
    </div>
  );
}

export default AdminKanbanBoardLoading;
