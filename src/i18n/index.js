import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import zh from './zh';
import en from './en';

const locales = RNLocalize.getLocales();
const systemLanguage = locales[0]?.languageCode;

if (systemLanguage) {
    I18n.locale = systemLanguage;
} else {
    I18n.locale = 'en'; // 默认语言为英文
}

I18n.fallbacks = true;
I18n.translations = {
    zh,
    en,
};

export function strings(name, params = {}) {//params默认为json类型
    return I18n.t(name, params);
}

export default I18n;
