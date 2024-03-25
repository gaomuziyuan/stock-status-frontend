"use client";

import Header from "@/components/header/Header";
import { fetchMenus } from "@/lib/action/action";
import { MenusType } from "@/lib/types/menu";
import React, { useEffect, useState } from "react";

function AdminLayout({ children }: { children: React.ReactNode }) {
  const [menus, setMenus] = useState<MenusType[]>([]);
  useEffect(() => {
    fetchMenus()
      .then((menus) => {
        setMenus(menus);
      })
      .catch((error) => {
        console.error("Failed to fetch menus:", error);
      });
  }, []);

  return <div className="flex flex-col justify-between w-full">{children}</div>;
}

export default AdminLayout;
