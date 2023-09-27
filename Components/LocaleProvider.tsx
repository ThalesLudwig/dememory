import { ReactNode, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLocales } from "expo-localization";

import { RootState } from "../config/store";
import { useTranslation } from "react-i18next";
import { setLocale } from "../config/localeSlice";

export default function LocaleProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const { value: locale } = useSelector((state: RootState) => state.locale);
  const {
    i18n: { changeLanguage },
  } = useTranslation();

  useEffect(() => {
    const deviceLocale = getLocales()[0].languageTag;
    const language = locale ? locale : deviceLocale.replace("-", "_");
    changeLanguage(language);
    dispatch(setLocale(language));
  }, [locale]);

  return <>{children}</>;
}
