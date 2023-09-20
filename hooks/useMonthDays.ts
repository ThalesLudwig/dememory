import { eachDayOfInterval, format } from "date-fns";
import { useMemo } from "react";

import { Day } from "../types/Day";

export const useMonthDays = (date: Date) => {
  const currentDate = useMemo(() => date, [date]);
  const parsedCurrentDate = new Date(currentDate.valueOf() + currentDate.getTimezoneOffset() * 60 * 1000);

  const firstDayOfMonth = new Date(parsedCurrentDate.getFullYear(), parsedCurrentDate.getMonth(), 1, 0);
  const lastDayOfMonth = new Date(parsedCurrentDate.getFullYear(), parsedCurrentDate.getMonth() + 1, 0);

  const dateInterval = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

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
