import { createSlice } from "@reduxjs/toolkit";
import existingStore from "../index";

const initialState = existingStore
  ? existingStore.user // if user is logged in, get user from session storage
  : {
      user: {
        userId: "",
        username: "",
        email: "",
        password: "",
        role: "",
        token: "",
        isLoggedIn: false,
        isLoading: false,
        error: null,
      },
    };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.user.isLoading = true;
      state.user.error = null;
    },
    loginSuccess: (state, { payload }) => {
      state.user.isLoading = false;
      state.user.isLoggedIn = true;
      state.user.userId = payload.userId;
      state.user.username = payload.username;
      state.user.email = payload.email;
      state.user.password = payload.password;
      state.user.role = payload.role;
      state.user.token = payload.token;
    },
    loginFailure: (state, action) => {
      state.user.isLoading = false;
      state.user.error = action.payload;
    },
    logout: (state) => {
      state.user.isLoggedIn = false;
      state.user.userId = "";
      state.user.username = "";
      state.user.email = "";
      state.user.password = "";
      state.user.role = "";
      state.user.token = "";
    },
    resetUsertoken: (state, { payload }) => {
      state.user.token = payload;
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
