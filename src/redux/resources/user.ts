import { createSlice } from "@reduxjs/toolkit";
import existingStore from "../index";

const initialState: User = existingStore
  ? existingStore.user // if user is logged in, get user from session storage
  : {
      userId: "",
      username: "",
      email: "",
      role: "",
      token: "",
      isLoggedIn: false,
      isLoading: false,
      error: null,
    };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.userId = payload.userId;
      state.username = payload.username;
      state.email = payload.email;
      state.role = payload.role;
      state.token = payload.token;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userId = "";
      state.username = "";
      state.email = "";
      state.role = "";
      state.token = "";
    },
    resetUsertoken: (state, { payload }) => {
      state.token = payload;
    },
  },
});

export const {
  login,
  loginSuccess,
  loginFailure,
  logout,
  resetUsertoken,
} = userSlice.actions;

export default userSlice.reducer;
