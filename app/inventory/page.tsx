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

  function handleUpdatePaints(id: string, newCount: number, status: string) {
    dispatch(editCard({ id, count: newCount, status }));
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
          <Button
            variant="outline"
            onClick={() =>
              handleUpdatePaints(card.id, card.count + 1, card.status)
            }
          >
            +
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              handleUpdatePaints(card.id, card.count - 1, card.status)
            }
          >
            -
          </Button>
        </div>
      ))}
    </div>
  );
}

export default AdminInventoryPage;
