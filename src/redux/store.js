import { configureStore } from "@reduxjs/toolkit";
import user from "./resources/user";
import products from "./resources/products";
import orders from "./resources/orders";
import cart from "./resources/cart";

const rootReducer = {
  user,
  products,
  orders,
  cart,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;

store.subscribe(() => {
  sessionStorage.clear();
  sessionStorage.setItem("store", JSON.stringify(store.getState()));
});
