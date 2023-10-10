import { createSlice } from "@reduxjs/toolkit";

type SettingsState = {
  showFavorites: boolean;
};

const initialState: SettingsState = { showFavorites: true };

const SettingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setShowFavorites(state, { payload }) {
      state.showFavorites = payload;
    },
  },
});

export const { setShowFavorites } = SettingsSlice.actions;

export default SettingsSlice.reducer;
