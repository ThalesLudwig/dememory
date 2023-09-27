import { useSelector } from "react-redux";
import { useCallback } from "react";
import { format } from "date-fns";

import { RootState } from "../config/store";

import { useDateLocale } from "./useDateLocale";

export const useCurrentDate = () => {
  const { value: selectedDay } = useSelector((state: RootState) => state.date);
  const locale = useDateLocale();

  const currentDate = useCallback(
    (stringFormat: string) => {
      const rawDate = new Date(selectedDay);
      return format(new Date(rawDate.valueOf() + rawDate.getTimezoneOffset() * 60 * 1000), stringFormat, { locale });
    },
    [selectedDay, locale],
  );

  return currentDate;
};
