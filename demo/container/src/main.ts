import { default as foundationStart } from 'foundation/start';
import { setEnv } from 'llqm-framework-sdk';
import bcp47 from 'bcp47';

export default {
  start: () => {
    setEnv({ RUNTIME_ENV: window.__APS_ENV__.RUNTIME_ENV });
    foundationStart();
  },
  langTransform: (lang) => {
    return bcp47.parse(lang).langtag.language.language
  },
}
