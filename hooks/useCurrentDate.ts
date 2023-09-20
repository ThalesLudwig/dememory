import { useSelector } from "react-redux";

import { RootState } from "../config/store";
import { useCallback } from "react";
import { format } from "date-fns";

export const useCurrentDate = () => {
  const { value: selectedDay } = useSelector((state: RootState) => state.date);

  const currentDate = useCallback(
    (stringFormat: string) => {
      const rawDate = new Date(selectedDay);
      return format(new Date(rawDate.valueOf() + rawDate.getTimezoneOffset() * 60 * 1000), stringFormat);
    },
    [selectedDay],
  );

  return currentDate;
};
