import { CardType } from "@/lib/types/cardType";
import { useDroppable } from "@dnd-kit/core";
import KanbanCard from "./KanbanCard";

interface KanbanLaneProps {
  title: string;
  items: CardType[];
}

export default function KanbanLane({ title, items }: KanbanLaneProps) {
  const { setNodeRef } = useDroppable({
    id: title,
  });
  return (
    <div ref={setNodeRef}>
      <h2>{title}</h2>
      {items.map((item, key) => (
        <KanbanCard
          title={item.id}
          key={key}
          index={key}
          parent={title}
          card={item}
        />
      ))}
    </div>
  );
}
