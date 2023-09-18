import { eachDayOfInterval, format } from "date-fns";
import { useMemo } from "react";

import { Day } from "../types/Day";

export const useMonthDays = (date: Date) => {
  const currentDate = useMemo(() => date, [date]);

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const dateInterval = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });

  const daysInMonth: Day[] = dateInterval.map((date) => {
    return {
      key: format(date, "yyyy-MM-dd"),
      value: format(date, "dd"),
      name: format(date, "EEE"),
      month: format(date, "MM"),
      year: format(date, "yyyy"),
    };
  });

  return daysInMonth;
};
