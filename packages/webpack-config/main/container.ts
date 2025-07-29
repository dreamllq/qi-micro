import setPublicPath from 'llqm-automation-webpack-plugin/public-path';

(async () => {
  const main = await import('@/main');
  await setPublicPath();
  const { setAppsData, initI18n, getLanguage} = await import('llqm-framework-sdk');
  const language = getLanguage();
  const messages = (await main.default.messagesLoaders[language]()).default
  initI18n({messages});
  const appsData = await import('llqm-automation-webpack-plugin/main');
  setAppsData(appsData.default);
  main.default.start()
})();