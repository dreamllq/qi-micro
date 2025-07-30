import setPublicPath from 'llqm-automation-webpack-plugin/public-path';

(async () => {
  const main = await import('@/main');
  await setPublicPath();
  const { setAppsData, initI18n, getLanguage} = await import('llqm-framework-sdk');
  const { load } = await import('llqm-automation-webpack-plugin/locales');
  const language = getLanguage();
  const messages = (await load[language]())
  initI18n({messages});
  const appsData = await import('llqm-automation-webpack-plugin/main');
  setAppsData(appsData.default);
  main.default.start()
})();