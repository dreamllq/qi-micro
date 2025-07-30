// export enum Language {
//   ZH_CN = 'zh-cn',
//   EN = 'en',
//   JA = 'ja'
// }

// const supportLanguages = [
//   Language.ZH_CN,
//   Language.EN,
//   Language.JA
// ];

// const getBrowserLanguage = () => {
//   const language = navigator.language;
//   if (language.startsWith('zh')) {
//     return Language.ZH_CN;
//   } else if (language.startsWith('en')) {
//     return Language.EN;
//   } else if (language.startsWith('ja')) {
//     return Language.JA;
//   } else {
//     return Language.ZH_CN;
//   }
// };

const getStorageLanguage = () => {
  const language = localStorage.getItem('language');

  if (language) {
    return language;
  }

  return null;
};

export const setLanguage = (language: string) => {
  localStorage.setItem('language', language);
};

export const getLanguage = () => {
  const storageLanguage = getStorageLanguage();
  return storageLanguage || navigator.language;
};