import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../config/store";
import { useTranslation } from "react-i18next";

export default function LocaleProvider({ children }: { children: ReactNode }) {
  const { value: locale } = useSelector((state: RootState) => state.locale);
  const {
    i18n: { changeLanguage },
  } = useTranslation();

  useEffect(() => {
    changeLanguage(locale);
  }, []);

  return <>{children}</>;
}
