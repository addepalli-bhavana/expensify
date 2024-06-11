import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import profileSlice from "./features/profileSlice";
import uiSlice from "./features/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
    ui:uiSlice
  },
});
