import setPublicPath from 'llqm-automation-webpack-plugin/public-path';

(async () => {
  const main = await import('@/main');
  await setPublicPath();
  const { setAppsData, initI18n} = await import('llqm-framework-sdk');
  initI18n(main.default.i18n);
  const appsData = await import('llqm-automation-webpack-plugin/main');
  setAppsData(appsData.default);
  main.default.start()
})();