import { useSelector } from "react-redux";
import { useMemo } from "react";

import { RootState } from "../config/store";

export const useFavoriteEntries = () => {
  const { value: entries } = useSelector((state: RootState) => state.entries);

  const favoriteEntries = useMemo(() => {
    return entries
      .filter((entry) => entry.isPinned)
      .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
  }, [entries]);

  return favoriteEntries;
};
