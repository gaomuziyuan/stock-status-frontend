import { CardType } from "@/lib/types/cardType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type CardsState = {
  cards: CardType[];
};

const initialState: CardsState = {
  cards: [],
};

export const cardSlice = createSlice({
  name: "card",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    UpdateCardStatus: (
      state,
      action: PayloadAction<{ id: string; count: number }>
    ) => {
      const { id, count } = action.payload;
      const card = state.cards.find((card) => card.id === id);
    },
  },
});

export const { UpdateCardStatus } = cardSlice.actions;
export default cardSlice.reducer;
