import { MenusType } from "@/lib/types/menu";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDownIcon } from "lucide-react";

export default function Header({ menus }: { menus: MenusType[] | undefined }) {
  const pathName = usePathname();
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
