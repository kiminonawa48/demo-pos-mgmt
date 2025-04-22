import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

// This approach uses index signatures to allow any string keys
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: {
        [key: string]: string;
      };
      dashboard: {
        [key: string]: string;
      };
      sidebar_pos_mgmt: {
        [key: string]: string;
      };
      // You can add more namespaces as needed
    };
  }
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "eng",
    ns: ["common", "dashboard", "sidebar_pos_mgmt"], // List all your namespaces here
    defaultNS: "common",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

export default i18n;
