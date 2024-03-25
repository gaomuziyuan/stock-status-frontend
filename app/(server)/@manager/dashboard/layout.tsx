import Header from "@/components/header/Header";
import React from "react";

function ManagerDashboardLayout({
  kanbanboard,
}: {
  kanbanboard: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {kanbanboard}
    </>
  );
}

export default ManagerDashboardLayout;
