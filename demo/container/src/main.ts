import { default as foundationStart } from 'foundation/start';
import { setEnv, Language } from 'llqm-framework-sdk';

export default {
  start: () => {
    setEnv({ RUNTIME_ENV: window.__APS_ENV__.RUNTIME_ENV });
    foundationStart();
  },
  messagesLoaders: {
    [Language.ZH_CN]: ()=>import('./locales/zh-cn'),
    [Language.EN]: ()=>import('./locales/en'),
    [Language.JA]: ()=>import('./locales/ja')
  }
}
