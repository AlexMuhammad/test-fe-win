import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axiosInstance from "./api";
import type { IProductList } from "@/types";

interface productState {
  data: Record<string, any>;
  detailData: Record<string, any>;
  loading: boolean;
  error: string | null;
}

const initialState: productState = {
  data: {},
  detailData: {},
  loading: false,
  error: null,
};

export const getProductList = createAsyncThunk(
  "product/getProductList",
  async (_) => {
    try {
      const response = await axiosInstance.get("/products");

      return response.data;
    } catch (error: any) {
      return error.message;
    }
  }
);

export const getDetailProduct = createAsyncThunk(
  "product/getDetailProduct",
  async ({ id }: { id: number }) => {
    try {
      const response = await axiosInstance.get(`/products/${id}`);

      return response.data;
    } catch (error: any) {
      return error.message;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async ({ id }: { id: number }) => {
    try {
      const response = await axiosInstance.delete(`/products/delete/${id}`);

      return response.data;
    } catch (error: any) {
      return error.message;
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async ({name, description, price, file}: {name: string, description: string, price: any, file: any}) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      const response = await axiosInstance.post("/products/create", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error: any) {
      return error.message;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({name, description, price, file, id}: {name: string, description: string, price: any, file: any, id: number}) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      const response = await axiosInstance.patch(`/products/update/${id}`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error: any) {
      return error.message;
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getProductList.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(getProductList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(getDetailProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDetailProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.detailData = action.payload;
      })
      .addCase(getDetailProduct.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createProduct.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateProduct.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
