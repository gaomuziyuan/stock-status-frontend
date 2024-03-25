import Header from "@/components/header/Header";
import React from "react";

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between w-full">
      <Header />
      {children}
    </div>
  );
}
