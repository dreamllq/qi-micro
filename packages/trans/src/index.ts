import transLocale from './trans-locale';
import writeFileSync from './write-file'
import flat from './flat'
const fs = require('fs')
const path = require('path');

type LangConfig = {
  name: string;
  lang: string;
}
const getExistLocales = (lang, dir)=>{
  const langPath = path.resolve(dir, lang, 'index.ts');
  if (fs.existsSync(langPath)) {
    const locales = require(langPath).default;
    return locales;
  }
}
export const trans = async ({ from, to, dir }:{from:LangConfig, to:LangConfig[], dir:string}) => {
  console.log('trans', from, to, dir);

  if (!fs.existsSync(dir)) {
    console.log('未找到翻译目录');
    return;
  }

  if (!fs.existsSync(path.resolve(dir, from.name, 'index.ts'))) {
    console.log('未找到翻译源文件')
    return;
  }
  
  const fromLocales = require(path.resolve(dir, from.name)).default;
  await to.reduce((acc, toLang)=>{
    return acc.then(async ()=>{
      const locales = getExistLocales(toLang.name, dir);
      const message = await transLocale({locales:fromLocales, from: from.lang}, toLang.lang, locales);
      const code = `export default ${JSON.stringify(message, null, 2)}`;
      writeFileSync(`${dir}/${toLang.name}`,'index.ts', code, { flag: 'w+' });
    })
  }, Promise.resolve())
}