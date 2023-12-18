import { createSlice } from "@reduxjs/toolkit";

type KeysState = {
  public: string;
  private: string;
};

const initialState: KeysState = { public: "", private: "" };

const KeysSlice = createSlice({
  name: "keys",
  initialState,
  reducers: {
    setKeys(state, { payload }) {
      state.public = payload.public;
      state.private = payload.private;
    },
  },
});

export const { setKeys } = KeysSlice.actions;

export default KeysSlice.reducer;
