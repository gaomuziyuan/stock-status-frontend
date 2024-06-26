"use client";

import KanbanCard from "@/components/dnd/KanbanCard";
import Header from "@/components/header/Header";
import { fetchMenus } from "@/lib/action/action";
import { fetchCards } from "@/lib/redux/slices/cardSlice/cardSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { MenusType } from "@/lib/types/menu";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MemberDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const [menus, setMenus] = useState<MenusType[]>([]);
  const cards = useSelector((state: RootState) => state.cards.cards);
  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);
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
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
        {cards.map((card, key) => (
          <KanbanCard
            title={card.id}
            key={key}
            index={key}
            parent=""
            card={card}
          />
        ))}
      </div>
    </>
  );
}
