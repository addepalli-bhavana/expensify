import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    email: localStorage.getItem("email"),
    isLoggedIn: !!localStorage.getItem("email"),
  },
  reducers: {
    loginUser: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.token = null;
      state.email = null;
      state.isLoggedIn = false;
    },
  },
});
export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
