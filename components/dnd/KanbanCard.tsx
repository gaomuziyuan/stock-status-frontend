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

function getCardColorClass(id: string) {
  switch (id) {
    case "blue":
      return "text-blue-500";
    case "grey":
      return "text-gray-500";
    case "black":
      return "text-black";
    case "white":
      return "text-white";
    case "purple":
      return "text-purple-500";
    default:
      return "";
  }
}
function getStatusColorClass(status: string) {
  switch (status) {
    case "Available":
      return "text-green-500";
    case "Out":
      return "text-red-500";
    case "Low":
      return "text-orange-500";
    default:
      return "";
  }
}
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
      <Card className="bg-gray-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={`text-xl ${getCardColorClass(card.id)}`}>
            {card.id}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl font-bold ${getStatusColorClass(card.status)}`}
          >
            {card.status}
          </div>
          <p className="text-xl ">{card.count}</p>
        </CardContent>
      </Card>
    </div>
  );
}
