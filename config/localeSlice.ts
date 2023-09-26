import { createSlice } from "@reduxjs/toolkit";

type LocaleState = {
  value: string;
};

const initialState: LocaleState = { value: "en_US" };

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
