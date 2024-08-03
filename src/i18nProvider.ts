import polyglotI18nProvider from 'ra-i18n-polyglot';
import customRussianMessages from "./i18n/ru";

const i18nProvider = polyglotI18nProvider(() => customRussianMessages, 'ru');

export default i18nProvider;
