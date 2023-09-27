import { createSlice } from "@reduxjs/toolkit";

import { ThemeType } from "../types/Theme";

type ThemeState = {
  value: ThemeType;
};

const initialState: ThemeState = { value: "device" };

const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, { payload }) {
      state.value = payload;
    },
  },
});

export const { setTheme } = ThemeSlice.actions;

export default ThemeSlice.reducer;
