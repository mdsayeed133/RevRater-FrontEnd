import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import employeeSlice from "./employeeSlice.js";
import postSlice from "./postSlice.js";
import ratingSlice from "./ratingSlice.js";
import searchSlice from "./searchSlice.js";
import userSlice from "./userSlice.js";

export const store = configureStore({
  reducer: {
    users: userSlice,
    auth: authSlice,
    employees:employeeSlice,
    search:searchSlice,
    rating:ratingSlice,
    post: postSlice
  }
});