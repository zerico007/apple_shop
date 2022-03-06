import { createSlice } from "@reduxjs/toolkit";
import existingStore from "../index";

const initialState = existingStore
  ? existingStore.products
  : {
      products: [],
      loading: false,
      error: null,
    };

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProductsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getProductsSuccess: (state, action) => {
      state.products = action.payload.reverse();
      state.loading = false;
      state.error = null;
    },
    getProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getProductsRequest,
  getProductsSuccess,
  getProductsFailure,
} = productsSlice.actions;

export default productsSlice.reducer;
