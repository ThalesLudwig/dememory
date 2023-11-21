import { useSelector } from "react-redux";
import { useMemo } from "react";
import { format } from "date-fns";

import { RootState } from "../config/store";

export const useEntryDates = () => {
  const { value: entries } = useSelector((state: RootState) => state.entries);

  const dates = useMemo(() => {
    return entries.map(({ date }) => {
      const day = format(new Date(date), "dd");
      const month = format(new Date(date), "MM");
      const year = format(new Date(date), "yyyy");
      return `${year}-${month}-${day}`;
    });
  }, [entries]);

  return dates;
};
