import { useSelector } from "react-redux";
import { enUS, ptBR, es, fr, de, it, ja } from "date-fns/locale";
import { useMemo } from "react";

import { RootState } from "../config/store";

export const useDateLocale = () => {
  const { value: locale } = useSelector((state: RootState) => state.locale);

  const dateLocale = useMemo(() => {
    switch (locale) {
      case "de":
        return de;
      case "en_US":
        return enUS;
      case "es":
        return es;
      case "fr":
        return fr;
      case "it":
        return it;
      case "ja":
        return ja;
      case "pt_BR":
        return ptBR;
      default:
        return enUS;
    }
  }, [locale]);

  return dateLocale;
};
