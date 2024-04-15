"use client";

import { Button } from "@/components/ui/button";
import { editCard, fetchCards } from "@/lib/redux/slices/cardSlice/cardSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminInventoryPage() {
  const dispatch = useDispatch<AppDispatch>();

  const cards = useSelector((state: RootState) => state.cards.cards);
  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  const userRole = useSelector((state: RootState) => state.user.role);

  function handleEditPaints(id: string, newCount: number) {
    dispatch(editCard({ id, count: newCount }));
  }
  return (
    <div className="p-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className="flex justify-between items-center p-2 w-64 mx-auto"
        >
          <span>
            {card.color}: {card.count}
          </span>
          {userRole !== "senior" && userRole !== "admin" && (
            <>
              <Button
                disabled={userRole === "senior" || userRole === "admin"}
                variant="outline"
                onClick={() => handleEditPaints(card.id, card.count + 1)}
              >
                +
              </Button>
              <Button
                disabled={userRole === "senior" || userRole === "admin"}
                variant="outline"
                onClick={() => handleEditPaints(card.id, card.count - 1)}
              >
                -
              </Button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminInventoryPage;
