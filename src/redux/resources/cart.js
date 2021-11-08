import { createSlice } from "@reduxjs/toolkit";
import existingStore from "../index";

const initialState = existingStore
  ? existingStore.cart
  : {
      total: "",
      items: [],
      user: "",
      loading: false,
      error: null,
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCartRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCartSuccess: (state, { payload }) => {
      state.loading = false;
      if (payload.message) {
        state.total = "";
        state.items = [];
      }
      state.total = payload.Total;
      state.items = payload.items;
      state.user = payload.user;
    },
    getCartFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  getCartFailure,
  getCartRequest,
  getCartSuccess,
} = cartSlice.actions;

export default cartSlice.reducer;
