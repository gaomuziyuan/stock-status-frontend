import React from "react";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col justify-between w-full">{children}</div>;
}

export default AdminLayout;
