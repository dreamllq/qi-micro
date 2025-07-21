// import setPublicPath from '@llqm/automation-webpack-plugin/public-path';

// (async () => {
//   await setPublicPath();
//   const { default: env } = await import('./configs/env');
//   const { setAppsData, initI18n, setEnv } = await import('@llqm/framework-sdk');
//   setEnv(env);

//   const locales = await import('@llqm/automation-webpack-plugin/locales');
  
//   initI18n({
//     messages: Object.keys(locales.default).reduce((acc, key) => {
//       if (key === 'zhCn') {
//         acc['zh-CN'] = locales.default[key];
//       } else {
//         acc[key] = locales.default[key];
//       }
//       return acc;
//     }, {})
//   });

//   const appsData = await import('@llqm/automation-webpack-plugin/main');
//   console.log('appsData', appsData.default);
//   setAppsData(appsData.default);
//   import('./bootstrap');
// })();
import {start} from  './bootstrap'
import env from './configs/env';
const { setEnv } = await import('@llqm/framework-sdk');
setEnv(env);
start();
