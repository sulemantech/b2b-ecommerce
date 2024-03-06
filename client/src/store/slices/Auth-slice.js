import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
    token: null,
    expirationTime: null,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.expirationTime = jwtDecode(action.payload.token).exp * 1000; // Convert to milliseconds
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      state.expirationTime = null; // Clear expirationTime when logging out
    },
    setTokenExpiration(state, action) {
      state.expirationTime = action.payload.expirationTime;
    },
  },
});

export const { login, logout, setTokenExpiration } = authSlice.actions;
export default authSlice.reducer;
