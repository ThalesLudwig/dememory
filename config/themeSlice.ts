import { createSlice } from "@reduxjs/toolkit";

import { ThemeType } from "../types/Theme";

type ThemeState = {
  value: ThemeType;
  color: string;
};

const initialState: ThemeState = { value: "device", color: "purple" };

const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, { payload }) {
      state.value = payload;
    },
    setColor(state, { payload }) {
      state.color = payload;
    },
  },
});

export const { setTheme, setColor } = ThemeSlice.actions;

export default ThemeSlice.reducer;
