import { translations } from '../translations'
import { getLocales } from 'expo-localization';
import { I18n } from "i18n-js";

const deviceLanguage = getLocales()[0].languageCode;
const i18n = new I18n(translations);

i18n.translations = translations;
i18n.defaultLocale = 'en';
i18n.locale = deviceLanguage;
// // When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

export default i18n;
