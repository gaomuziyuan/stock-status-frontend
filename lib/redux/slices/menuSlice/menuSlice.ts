import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MenuState {
  id: string;
  name: string;
  url: string;
}

interface MenuPayload {
  id: string;
  name: string;
  url: string;
}

const initialState: MenuState = {
  id: "",
  name: "",
  url: "",
};

export const menuSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMenuState: (state, action: PayloadAction<MenuPayload>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.url = action.payload.url;
    },
  },
});

export const { setMenuState } = menuSlice.actions;
export default menuSlice.reducer;
