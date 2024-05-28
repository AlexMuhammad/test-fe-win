import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "./api";
import type { IProfilePayload } from "@/types";

interface ProfileInitialState {
  data: Record<any, any>;
  loading: boolean;
}

const initialState: ProfileInitialState = {
  data: {},
  loading: false,
};

export const profileUser = createAsyncThunk(
  "user/profileUser",
  async (_) => {
    try {
      const response = await axiosInstance.get("/profile");

      return response.data;
    } catch (error: any) {
      return error.message;
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(profileUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(profileUser.fulfilled, (state, action: PayloadAction<IProfilePayload>) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(profileUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default profileSlice.reducer;
