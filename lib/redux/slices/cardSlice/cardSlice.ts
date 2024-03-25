import { CardType } from "@/lib/types/cardType";
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
    // const response = await axios.get<CardType[]>(
    //   `${process.env.API_HOST}/paints`
    // );
    const response = await axios.get<CardType[]>(
      `https://stock-status-backend.vercel.app/paints`
    );
    return response.data;
  }
);
export const editCard = createAsyncThunk<
  CardType,
  { id: string; count: number; status: string }
>("cards/editCard", async ({ id, count, status }) => {
  // const response = await axios.get<CardType[]>(
  //   `${process.env.API_HOST}/paints`
  // );
  if (count > 10) {
    status = "available";
  } else if (count > 0 && count <= 10) {
    status = "low";
  } else {
    status = "out";
  }
  const response = await axios.patch<CardType>(
    `https://stock-status-backend.vercel.app/paints/${id}`,
    {
      id,
      count,
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
      action: PayloadAction<{ id: string; count: number }>
    ) => {
      const { id, count } = action.payload;
      const card = state.cards.find((card) => card.id === id);
      if (card) {
        card.count = count;
        if (card.count > 10) {
          card.status = "available";
        } else if (card.count > 0 && card.count <= 10) {
          card.status = "low";
        } else {
          card.status = "out";
        }
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
      });
  },
});

export const { UpdateCard } = cardSlice.actions;
export default cardSlice.reducer;
