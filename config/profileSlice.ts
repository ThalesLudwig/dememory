import { createSlice } from "@reduxjs/toolkit";

import { ThemeType } from "../types/Theme";

type ProfileState = {
  showLoginPage: boolean;
};

const initialState: ProfileState = { showLoginPage: true };

const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setShowLoginPage(state, { payload }) {
      state.showLoginPage = payload;
    },
  },
});

export const { setShowLoginPage } = ProfileSlice.actions;

export default ProfileSlice.reducer;
