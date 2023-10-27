import { createSlice } from "@reduxjs/toolkit";

type SettingsState = {
  showFavorites: boolean;
  isAppLocked: boolean;
};

const initialState: SettingsState = { showFavorites: true, isAppLocked: false };

const SettingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setShowFavorites(state, { payload }) {
      state.showFavorites = payload;
    },
    setIsAppLocked(state, { payload }) {
      state.isAppLocked = payload;
    },
  },
});

export const { setShowFavorites, setIsAppLocked } = SettingsSlice.actions;

export default SettingsSlice.reducer;
