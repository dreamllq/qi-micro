import setPublicPath from 'llqm-automation-webpack-plugin/public-path';

(async () => {
  const main = await import('@/main');
  await setPublicPath();
  const { setAppsData, initI18n, getLanguage} = await import('llqm-framework-sdk');
  const { load } = await import('llqm-automation-webpack-plugin/locales');
  let language = getLanguage();

  let  messages ;

  if(main.default.langTransform){
    messages = (await load(main.default.langTransform(language)))
  } else {
    messages = (await load(language))
  }
  
  initI18n({messages:{[language]:messages}, locale:language});
  const appsData = await import('llqm-automation-webpack-plugin/main');
  setAppsData(appsData.default);
  main.default.start()
})();