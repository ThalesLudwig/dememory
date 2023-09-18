import { createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";

type DateState = {
  value: string;
};

const initialState: DateState = { value: format(new Date(), "yyyy-MM-dd") };

const DateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setDate(state, { payload }) {
      state.value = payload;
    },
  },
});

export const { setDate } = DateSlice.actions;

export default DateSlice.reducer;
