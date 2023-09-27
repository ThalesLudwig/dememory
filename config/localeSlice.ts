import { createSlice } from "@reduxjs/toolkit";

import { Locales } from "../types/Locales";

type LocaleState = {
  value: Locales;
};

const initialState: LocaleState = { value: "" };

const LocaleSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    setLocale(state, { payload }) {
      state.value = payload;
    },
  },
});

export const { setLocale } = LocaleSlice.actions;

export default LocaleSlice.reducer;
