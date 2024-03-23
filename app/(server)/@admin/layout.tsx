"use client";

import Header from "@/components/header/Header";
import { MenusType } from "@/lib/types/menu";
import axios from "axios";
import React, { useEffect, useState } from "react";

function AdminLayout({ children }: { children: React.ReactNode }) {
  const [menus, setMenus] = useState<MenusType[]>([]);
  useEffect(() => {
    async function fetchMenus() {
      try {
        const response = await axios.get("http://localhost:3001/menus");
        setMenus(response.data);
      } catch (error) {
        console.error("There is a problem fetching menus", error);
      }
    }
    fetchMenus();
  }, []);
  return (
    <div className="flex flex-col justify-between w-full">
      <Header menus={menus} />
      {children}
    </div>
  );
}

export default AdminLayout;
