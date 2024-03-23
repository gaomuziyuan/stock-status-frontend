import React, { ReactNode } from "react";

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container flex flex-col min-h-screen min-w-full bg-gray-50 dark:bg-slate-900 max-h-screen">
      <nav
        className="flex basis-full items-center justify-between w-full mx-auto p-4 sm:p-6 md:p-8"
        aria-label="Global"
      ></nav>
      <main className="flex w-full flex-grow h-full items-center justify-center">
        {children}
      </main>
    </div>
  );
}

export default AuthLayout;
