import { createSlice } from "@reduxjs/toolkit";

type ProfileState = {
  showLoginPage: boolean;
  wallet?: string;
  name: string;
  email: string;
};

const initialState: ProfileState = { showLoginPage: true, name: "", email: "" };

const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setShowLoginPage(state, { payload }) {
      state.showLoginPage = payload;
    },
    setWallet(state, { payload }) {
      state.wallet = payload;
    },
    setName(state, { payload }) {
      state.name = payload;
    },
    setEmail(state, { payload }) {
      state.email = payload;
    },
  },
});

export const { setShowLoginPage, setWallet, setName, setEmail } = ProfileSlice.actions;

export default ProfileSlice.reducer;
