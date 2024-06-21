import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../i18n/en";
import zh from "../i18n/zh";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: en,
      zh: zh,
    },

    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export default i18n;
