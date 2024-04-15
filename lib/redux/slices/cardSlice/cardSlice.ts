import { CardStatus, CardType } from "@/lib/types/cardType";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type CardsState = {
  cards: CardType[];
  loading: "idle" | "pending" | "succeeded" | "failed";
};

const initialState: CardsState = {
  cards: [],
  loading: "idle",
};

export const fetchCards = createAsyncThunk<CardType[]>(
  "cards/fetchCards",
  async () => {
    const response = await axios.get<CardType[]>(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/paints`
    );
    return response.data;
  }
);
export const editCard = createAsyncThunk<
  CardType,
  { id: string; count: number }
>("cards/editCard", async ({ id, count }) => {
  const response = await axios.patch<CardType>(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/paints/${id}`,
    {
      id,
      count,
    }
  );
  return response.data;
});

export const updateCard = createAsyncThunk<
  CardType,
  { id: string; status: string }
>("cards/updateCard", async ({ id, status }) => {
  const response = await axios.patch<CardType>(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/paints/${id}`,
    {
      id,
      status,
    }
  );
  return response.data;
});

export const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    UpdateCard: (
      state,
      action: PayloadAction<{ id: string; status: CardStatus }>
    ) => {
      const { id, status } = action.payload;
      const card = state.cards.find((card) => card.id === id);
      if (card) {
        card.status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.loading = "idle";
        state.cards = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = "idle";
      })
      .addCase(editCard.fulfilled, (state, action: PayloadAction<CardType>) => {
        const index = state.cards.findIndex(
          (card) => card.id === action.payload.id
        );
        if (index !== -1) {
          state.cards[index] = action.payload;
        }
      })
      .addCase(
        updateCard.fulfilled,
        (state, action: PayloadAction<CardType>) => {
          const index = state.cards.findIndex(
            (card) => card.id === action.payload.id
          );
          if (index !== -1) {
            state.cards[index] = action.payload;
          }
        }
      );
  },
});

export const { UpdateCard } = cardSlice.actions;
export default cardSlice.reducer;
