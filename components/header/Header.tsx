"use client";

import { MenusType } from "@/lib/types/menu";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchMenus } from "@/lib/action/action";

export default function Header() {
  const pathName = usePathname();
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
  return (
    <div className="flex gap-3 mx-auto w-64">
      {menus?.map((menu) => (
        <Button
          key={menu.id}
          variant={pathName === menu.url ? "selected" : "unselected"}
        >
          <Link href={menu.url}>{menu.name}</Link>
          <ChevronDownIcon className="ml-1" />
        </Button>
      ))}
    </div>
  );
}
