import {default as foundationStart} from 'foundation/start';
import { setEnv } from 'llqm-framework-sdk';

setEnv({
  RUNTIME_ENV: window.__APS_ENV__.RUNTIME_ENV
});

foundationStart();
