import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import canto from "../i18n/canto";
import en from "../i18n/en";
import zh from "../i18n/zh";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: en,
      zh: zh,
      canto: canto,
    },

    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

chrome.storage.sync.get("lang", (data) => {
  i18n.changeLanguage(data.lang);
});

export const languages = {
  en: "English",
  zh: "中文",
  canto: "廣東話",
};

export default i18n;
