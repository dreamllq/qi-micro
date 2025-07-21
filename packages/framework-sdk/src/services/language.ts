

export enum Language {
  ZH_CN = 'zh-CN',
  EN = 'en',
  JA = 'ja'
}

const supportLanguages = [
  Language.ZH_CN,
  Language.EN,
  Language.JA
];

const getBrowserLanguage = () => {
  const language = navigator.language;
  if (language.startsWith('zh')) {
    return Language.ZH_CN;
  } else if (language.startsWith('en')) {
    return Language.EN;
  } else if (language.startsWith('ja')) {
    return Language.JA;
  } else {
    return Language.ZH_CN;
  }
};

const getStorageLanguage = () => {
  const language = localStorage.getItem('language') as Language;

  if (language && supportLanguages.includes(language)) {
    return language;
  }

  return null;
};

export const setLanguage = (language: string) => {
  if (supportLanguages.includes(language as Language)) {
    localStorage.setItem('language', language);
  } else {
    localStorage.setItem('language', Language.ZH_CN);
  }
};

export const getLanguage = () => {
  const storageLanguage = getStorageLanguage();
  const browserLanguage = getBrowserLanguage();

  return storageLanguage || browserLanguage;
};