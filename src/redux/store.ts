import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
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

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector = () => useSelector((state: RootState) => state);
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;

store.subscribe(() => {
  sessionStorage.clear();
  sessionStorage.setItem("store", JSON.stringify(store.getState()));
});
