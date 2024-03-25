import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  isLoggedIn: boolean;
  username: string | null;
  role: string;
}

interface LoginPayload {
  isLoggedIn: boolean;
  username: string | null;
  role: string;
}

const initialState: UserState = {
  isLoggedIn: false,
  username: null,
  role: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginState: (state, action: PayloadAction<LoginPayload>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.username = action.payload.username;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = null;
    },
  },
});

export const { setLoginState, logout } = userSlice.actions;
export default userSlice.reducer;
