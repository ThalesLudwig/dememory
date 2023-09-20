import { createSlice } from "@reduxjs/toolkit";

import { Entry } from "../types/Entry";

type EntriesState = {
  value: Entry[];
};

const initialState: EntriesState = { value: [] };

const EntriesSlice = createSlice({
  name: "entries",
  initialState,
  reducers: {
    addEntry(state, { payload }) {
      state.value = [...state.value, payload];
    },
    removeEntry(state, { payload }) {
      state.value = [...state.value].filter((entry) => entry.id !== payload);
    },
    updateEntry(state, { payload }) {
      const entries = [...state.value];
      const index = entries.findIndex((entry) => entry.id === payload.id);
      entries[index] = payload;
      state.value = entries;
    },
  },
});

export const { addEntry, removeEntry, updateEntry } = EntriesSlice.actions;

export default EntriesSlice.reducer;
