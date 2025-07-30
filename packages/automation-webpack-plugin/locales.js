
    import { mergeJson } from 'llqm-framework-sdk';
    export const load = async (language:any) => {
      const locales:any[] = [];
      
      
          const supportLanguages0 = (await import('foundation/support-languages')).default;
          const messagesLoader0 = (await import('foundation/messages-loader')).default;
          if (supportLanguages0.includes(language)) {
            const locale0 = await messagesLoader0[language]();
            locales.push(locale0.default);
          }
        

          const supportLanguages1 = (await import('app/support-languages')).default;
          const messagesLoader1 = (await import('app/messages-loader')).default;
          if (supportLanguages1.includes(language)) {
            const locale1 = await messagesLoader1[language]();
            locales.push(locale1.default);
          }
        
      

      return { language: mergeJson(...locales) };
    };
  