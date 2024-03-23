import React from "react";

function AdminDashboardLayout({
  kanbanboard,
}: {
  kanbanboard: React.ReactNode;
}) {
  return <div>{kanbanboard}</div>;
}

export default AdminDashboardLayout;
