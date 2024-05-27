import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./products.slice";
import authSlice from "./auth.slice";
import profileSlice from "./profile.slice";

export const store = configureStore({
  reducer: {
    products: productSlice,
    auth: authSlice,
    profile: profileSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
