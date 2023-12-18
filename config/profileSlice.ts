import { createSlice } from "@reduxjs/toolkit";

type ProfileState = {
  showLoginPage: boolean;
  name: string;
};

const initialState: ProfileState = { showLoginPage: true, name: "" };

const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setShowLoginPage(state, { payload }) {
      state.showLoginPage = payload;
    },
    setName(state, { payload }) {
      state.name = payload;
    },
  },
});

export const { setShowLoginPage, setName } = ProfileSlice.actions;

export default ProfileSlice.reducer;
