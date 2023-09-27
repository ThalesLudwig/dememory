import { createSlice } from "@reduxjs/toolkit";

type ProfileState = {
  showLoginPage: boolean;
  wallet?: string;
};

const initialState: ProfileState = { showLoginPage: true };

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
  },
});

export const { setShowLoginPage, setWallet } = ProfileSlice.actions;

export default ProfileSlice.reducer;
