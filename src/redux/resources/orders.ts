import { createSlice } from "@reduxjs/toolkit";
import existingStore from "../index";

const initialState = existingStore
  ? existingStore.orders
  : {
      orders: [],
      loading: false,
      error: null,
    };

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    getOrdersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getOrdersSuccess: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
      state.error = null;
    },
    getOrdersFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  getOrdersRequest,
  getOrdersSuccess,
  getOrdersFailure,
} = ordersSlice.actions;

export default ordersSlice.reducer;
