import { CardType } from "./cardType";

export enum ColumnType {
  Available = "available",
  Low = "low",
  Out = "out",
}

export type Column = {
  id: ColumnType;
  cards: CardType[];
};
