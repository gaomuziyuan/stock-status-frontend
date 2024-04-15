import { UniqueIdentifier } from "@dnd-kit/core";

export type CardStatus = "available" | "low" | "out";
export type CardType = {
  id: string;
  dnd: UniqueIdentifier;
  color: string;
  count: number;
  status: CardStatus;
};
