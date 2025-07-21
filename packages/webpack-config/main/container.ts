import setPublicPath from 'llqm-automation-webpack-plugin/public-path';

(async () => {
  await setPublicPath();
  const { setAppsData, initI18n, Language} = await import('llqm-framework-sdk');
  const locales = await import('llqm-automation-webpack-plugin/locales');
  initI18n({
    messages: Object.keys(locales.default).reduce((acc, key) => {
      if (key === 'zhCn') {
        acc[Language.ZH_CN] = locales.default[key];
      } else {
        acc[key] = locales.default[key];
      }
      return acc;
    }, {})
  });

  const appsData = await import('llqm-automation-webpack-plugin/main');
  setAppsData(appsData.default);
  import('@/main');
})();