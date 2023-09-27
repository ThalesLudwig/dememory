import { useSelector } from "react-redux";
import { enUS, ptBR } from "date-fns/locale";
import { useMemo } from "react";

import { RootState } from "../config/store";

export const useDateLocale = () => {
  const { value: locale } = useSelector((state: RootState) => state.locale);

  const dateLocale = useMemo(() => {
    switch (locale) {
      case "en_US":
        return enUS;
      case "pt_BR":
        return ptBR;
      default:
        return enUS;
    }
  }, [locale]);

  return dateLocale;
};
