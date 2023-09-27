import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { getLocales } from "expo-localization";

import { RootState } from "../config/store";
import { useTranslation } from "react-i18next";

export default function LocaleProvider({ children }: { children: ReactNode }) {
  const { value: locale } = useSelector((state: RootState) => state.locale);
  const {
    i18n: { changeLanguage },
  } = useTranslation();

  useEffect(() => {
    const deviceLocale = getLocales()[0].languageTag;
    changeLanguage(locale ? locale : deviceLocale.replace("-", "_"));
  }, []);

  return <>{children}</>;
}
