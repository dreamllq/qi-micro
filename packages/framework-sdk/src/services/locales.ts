import { createI18n, I18n, type I18nOptions } from 'vue-i18n';
import { setLanguage } from './language';

export { useI18n } from 'vue-i18n';

type LocaleI18n = I18n;

let _i18n:LocaleI18n;

export const initI18n = ({ messages, locale }) => {
  const options: I18nOptions = {
    legacy: false,
    locale: locale,
    // fallbackLocale: Language.ZH_CN,
    messages: messages
  };
  setLanguage(locale);
  _i18n = createI18n(options);
};

export default new Proxy<LocaleI18n>({} as LocaleI18n, {
  get(_target, p) {
    return _i18n[p];
  }
});