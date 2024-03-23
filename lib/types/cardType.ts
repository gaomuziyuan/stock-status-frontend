import { UniqueIdentifier } from "@dnd-kit/core";

export type CardType = {
  id: string;
  dnd: UniqueIdentifier;
  color: string;
  count: number;
  status: "available" | "low" | "out";
};
