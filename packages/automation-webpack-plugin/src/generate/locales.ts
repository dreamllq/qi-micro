import { App } from "../type";
const fs = require('fs')
const path = require('path');
import { camelCase } from 'change-case';

export default (apps:App[]=[])=>{
  const code = `
    import { mergeJson } from 'llqm-framework-sdk';
    export const load = async (language) => {
      const locales = [];
      
      ${apps.map((app, index)=>{
        return `
          const supportLanguages${index} = (await import('${app.name}/support-languages')).default;
          const messagesLoader${index} = (await import('${app.name}/messages-loader')).default;
          if (supportLanguages${index}.includes(language)) {
            const locale${index} = await messagesLoader${index}[language]();
            locales.push(locale${index}.default);
          }
        `
      }).join('\n')}
      

      return { [language]: mergeJson(...locales) };
    };
  `;

  const to = path.resolve(__dirname, '../../locales.js')
  if (fs.existsSync(to) &&
      fs.readFileSync(to, 'utf8').trim() === code.trim()) {
      return;
  }
  fs.writeFileSync(to, code);
}