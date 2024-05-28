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

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    { email, password, name, gender }: { email: string; password: string, name: string, gender: "male" | "female" }, {rejectWithValue}
  ) => {
    try {
      const response = await axiosInstance.post("/auth/register", {
        email,
        password,
        name,
        gender
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
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
      })
  },
});

export default authSlice.reducer;
