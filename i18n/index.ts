import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import commonEnUS from "./locales/en_US/common.json";
import commonPtBR from "./locales/pt_BR/common.json";

export const defaultNS = "common";

export default i18next.use(initReactI18next).init({
  compatibilityJSON: "v3",
  fallbackLng: "en_US",
  returnEmptyString: false,
  defaultNS: "common",
  ns: [],
  resources: {
    en_US: {
      common: commonEnUS,
    },
    pt_BR: {
      common: commonPtBR,
    },
  },
});
