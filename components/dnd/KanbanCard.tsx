import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardType } from "@/lib/types/cardType";

export default function KanbanCard({
  title,
  index,
  parent,
  card,
}: {
  title: string;
  index: number;
  parent: string;
  card: CardType;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: title,
    data: {
      title,
      index,
      parent,
      card,
    },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  return (
    <div
      style={{ transform: style.transform }}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{card.id}</CardTitle>
          {card.id}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{card.status}</div>
          <p className="text-xs text-muted-foreground">{card.count}</p>
        </CardContent>
      </Card>
    </div>
  );
}
