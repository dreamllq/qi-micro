import transLocale from './trans-locale';
import writeFileSync from './write-file'
import flat from './flat'

export const trans = async ({ fromLang, toLangs, outDir }) => {
  const cn = flat(fromLang.locales);

  await toLangs.reduce((acc, item)=>{
    return acc.then(async ()=>{
      const message = await transLocale({locales:cn, from: fromLang.from}, item.to, item.locales);
      const code = `export default ${JSON.stringify(message, null, 2)}`;
      writeFileSync(`${outDir}/${item.name}`,'index.ts', code, { flag: 'w+' });
    })
  }, Promise.resolve())
}