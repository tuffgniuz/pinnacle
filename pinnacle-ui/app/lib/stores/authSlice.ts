"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface AuthState {
  token: string | null;
  error: string | null;
}

const getTokenFromLocalStorage = (): string | null => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    console.log(token);
    return token;
  }
  return null;
};

const initialState: AuthState = {
  token: getTokenFromLocalStorage(), // Load token from localStorage
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token); // Save token to localStorage
      }
    },
    logout: (state) => {
      state.token = null;
      state.error = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token"); // Remove token from localStorage
      }
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectToken = (state: RootState) => state.auth.token;
export const selectError = (state: RootState) => state.auth.error;
