import i18next from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translate from "./utility/translate";

const resources = translate;

i18next
  .use(detector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["es", "en"],
    resources: resources,
    fallbackLng: "es",
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
