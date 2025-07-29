import { getLanguage, Language } from 'llqm-framework-sdk';

const languageLoaders = {
  [Language.ZH_CN]: ()=>import('./zh-cn'),
  [Language.EN]: ()=>import('./en'),
  [Language.JA]: ()=>import('./ja')
};

export default  async ()=>{
  const language = getLanguage();
  return (await languageLoaders[language]()).default
}