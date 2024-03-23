"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import HomeLoading from "./loading";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-8 scroll-smooth">
      <div className="w-full">
        <div className="flex flex-row w-full p-3 justify-between items-center sticky top-0 inset-x-0 z-50 bg-background text-foreground">
          <div className="flex items-center gap-4">
            <Suspense fallback={<HomeLoading />}>
              <Button
                variant="selected"
                onClick={() => router.push("/dashboard")}
              >
                Log in
              </Button>
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
