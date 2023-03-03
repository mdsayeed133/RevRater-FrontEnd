import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import employeeSlice from "./employeeSlice.js";
import userSlice from "./userSlice.js";

export const store = configureStore({
  reducer: {
    users: userSlice,
    auth: authSlice,
    employee:employeeSlice,
  }
});