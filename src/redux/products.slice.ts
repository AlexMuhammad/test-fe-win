import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axiosInstance from "./api";

export const getProductList = createAsyncThunk<
  string,
  Promise<AxiosResponse<string, any>>
>("product/getProductList", async (_) => {
  try {
    const response = await axiosInstance.get("/products");

    return response.data;
  } catch (error: any) {
    return error.message
  }
});

interface productState {
    productData: string[],
    loading: boolean,
    error: string | null
}

const initialState: productState = {
    productData: [],
    loading: false,
    error: null
}

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProductList.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getProductList.fulfilled, (state, action) => {
            state.loading = false;
            state.productData = action.payload;
        }).addCase(getProductList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Something went wrong';
        })
    }
})

export default productSlice.reducer;
