import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice/userSlice";
import counterSlice from "./slices/counterSlice/counterSlice";
import cardSlice from "./slices/cardSlice/cardSlice";

const rootReducer = combineReducers({
  user: userSlice,
  counter: counterSlice,
  cards: cardSlice,
});
export default rootReducer;
