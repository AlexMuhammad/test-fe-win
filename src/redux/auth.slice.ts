import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "./api";
interface AuthInitialState {
  data: null | Record<any, any>;
  loading: boolean;
}

const initialState: AuthInitialState = {
  data: null,
  loading: false,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string }, {rejectWithValue}
  ) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
