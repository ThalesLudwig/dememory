import { createSlice } from "@reduxjs/toolkit";

type ThemeState = {
  value: "light" | "dark" | "device";
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
