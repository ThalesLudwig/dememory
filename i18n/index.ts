import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import commonEnUS from "./locales/en_US/common.json";
import commonPtBR from "./locales/pt_BR/common.json";
import commonEs from "./locales/es/common.json";
import commonDe from "./locales/de/common.json";
import commonFr from "./locales/fr/common.json";
import commonIt from "./locales/it/common.json";

export const defaultNS = "common";

export default i18next.use(initReactI18next).init({
  compatibilityJSON: "v3",
  fallbackLng: "en_US",
  returnEmptyString: false,
  defaultNS: "common",
  ns: [],
  resources: {
    de: {
      common: commonDe,
    },
    en_US: {
      common: commonEnUS,
    },
    es: {
      common: commonEs,
    },
    fr: {
      common: commonFr,
    },
    it: {
      common: commonIt,
    },
    pt_BR: {
      common: commonPtBR,
    },
  },
});
