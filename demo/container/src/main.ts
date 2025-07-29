import {default as foundationStart} from 'foundation/start';
import { setEnv, Language } from 'llqm-framework-sdk';
import locales from 'llqm-automation-webpack-plugin/locales';

export default {
  start: () => {
    setEnv({RUNTIME_ENV: window.__APS_ENV__.RUNTIME_ENV});

    foundationStart();
  },
  i18n:{
    messages: Object.keys(locales).reduce((acc, key) => {
      if (key === 'zhCn') {
        acc[Language.ZH_CN] = locales[key];
      } else {
        acc[key] = locales[key];
      }
      return acc;
    }, {})
  }
}
