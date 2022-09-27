import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: null,
    accessToken: null,
    idToken: null,
    refreshToken: null,
    isLogin: false,
    inviteeEmail: "",
  },
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.idToken = action.payload.idToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    logOut: (state, action) => {
      state.email = null;
      state.accessToken = null;
      state.idToken = null;
      state.refreshToken = null;
      state.isLogin = false;
    },
    setInviteeEmail: (state, action) => {
      state.inviteeEmail = action.payload.inviteeEmail;
    },
  },
});

export const { setToken, setEmail, logOut, setLogin, setInviteeEmail } =
  authSlice.actions;

export default authSlice.reducer;

export const selectCurrentEmail = (state) => state.auth.email;
export const selectCurrentAccessToken = (state) => state.auth.accessToken;
export const selectCurrentIdToken = (state) => state.auth.idToken;
export const selectRefreshToken = (state) => state.auth.refreshToken;
export const selectIsLogin = (state) => state.auth.isLogin;
export const selectInviteeEmail = (state) => state.auth.inviteeEmail;
