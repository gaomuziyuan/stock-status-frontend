"use client";

import { MenusType } from "@/lib/types/menu";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchMenus } from "@/lib/action/action";
import { RootState } from "@/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setMenuState } from "@/lib/redux/slices/menuSlice/menuSlice";
import axios from "axios";

export default function Header() {
  const pathName = usePathname();
  const [menus, setMenus] = useState<MenusType[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchMenus()
      .then((menus) => {
        setMenus(menus);
        dispatch(
          setMenuState({
            id: menus.id,
            name: menus.name,
            url: menus.url,
          })
        );
      })
      .catch((error) => {
        console.error("Failed to fetch menus:", error);
      });
  }, [dispatch]);

  return (
    <div className="flex gap-3 mx-auto w-full justify-center">
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
