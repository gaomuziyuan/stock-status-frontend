import { DndContext, rectIntersection } from "@dnd-kit/core";
import KanbanLane from "./KanbanLane";
import { useEffect, useState } from "react";
import { CardStatus, CardType } from "@/lib/types/cardType";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  UpdateCard,
  fetchCards,
  updateCard,
} from "@/lib/redux/slices/cardSlice/cardSlice";

export default function KanbanBoard() {
  const [availableItems, setAvailableItems] = useState<CardType[]>([]);
  const [lowItems, setLowItems] = useState<CardType[]>([]);
  const [outItems, setOutItems] = useState<CardType[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  const cards: CardType[] = useSelector(
    (state: RootState) => state.cards.cards
  );
  useEffect(() => {
    const newAvailableItems = cards.filter(
      (card) => card.status === ("Available" as CardStatus)
    );
    const newLowItems = cards.filter(
      (card) => card.status === ("Low" as CardStatus)
    );
    const newOutItems = cards.filter(
      (card) => card.status === ("Out" as CardStatus)
    );

    setAvailableItems(newAvailableItems);
    setLowItems(newLowItems);
    setOutItems(newOutItems);
  }, [cards]);

  return (
    <div className="max-w-[85rem] px-4 py-3 sm:px-6 lg:px-8 lg:py-3 mx-auto">
      <DndContext
        collisionDetection={rectIntersection}
        onDragEnd={(e) => {
          const container = e.over?.id;
          const title = e.active.data.current?.title ?? "";
          const index = e.active.data.current?.index ?? 0;
          const parent = e.active.data.current?.parent ?? "Available";
          const card = e.active.data.current?.card ?? null;
          dispatch(updateCard({ id: title, status: container as CardStatus }));
          if (parent !== container) {
            if (container === "Available") {
              setAvailableItems([...availableItems, card]);
            } else if (container === "Low") {
              setLowItems([...lowItems, card]);
            } else {
              setOutItems([...outItems, card]);
            }

            if (parent === "Available") {
              setAvailableItems([
                ...availableItems.slice(0, index),
                ...availableItems.slice(index + 1),
              ]);
            } else if (parent === "Low") {
              setLowItems([
                ...lowItems.slice(0, index),
                ...lowItems.slice(index + 1),
              ]);
            } else {
              setOutItems([
                ...outItems.slice(0, index),
                ...outItems.slice(index + 1),
              ]);
            }
          }
        }}
      >
        <div className="grid grid-cols-3 gap-4">
          <KanbanLane title="Available" items={availableItems} />
          <KanbanLane title="Low" items={lowItems} />
          <KanbanLane title="Out" items={outItems} />
        </div>
      </DndContext>
    </div>
  );
}
