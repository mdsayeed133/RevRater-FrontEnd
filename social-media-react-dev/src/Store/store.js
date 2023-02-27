import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./usersSlice.js";

export const store = configureStore({
  reducer: {
    users: userSlice
  }
});