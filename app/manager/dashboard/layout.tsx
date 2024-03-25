import React from "react";

function ManagerDashboardLayout({
  kanbanboard,
}: {
  kanbanboard: React.ReactNode;
}) {
  return <div>{kanbanboard}</div>;
}

export default ManagerDashboardLayout;
