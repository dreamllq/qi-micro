import {default as foundationStart} from 'foundation/start';
import { setEnv, Language } from 'llqm-framework-sdk';
import getLocaleMessages from './locales';

export default {
  start: () => {
    setEnv({RUNTIME_ENV: window.__APS_ENV__.RUNTIME_ENV});
    foundationStart();
  },
  getLocaleMessages:getLocaleMessages
}
