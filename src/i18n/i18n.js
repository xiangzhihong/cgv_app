import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';

const en = require('./locales/en');
const es = require('./locales/es');
const cn = require('./locales/zh-cn');

i18n.fallbacks = true;

i18n.translations = {
  en,
  es,
  cn,
};

const fallback = {languageTag: 'cn', isRTL: false};

const {languageTag} =
  RNLocalize.findBestAvailableLanguage(Object.keys(i18n.translations)) ||
  fallback;

i18n.locale = languageTag;
