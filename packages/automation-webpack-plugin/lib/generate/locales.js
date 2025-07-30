"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var path = require('path');
exports.default = (function (apps) {
    if (apps === void 0) { apps = []; }
    var code = "\n    import { mergeJson } from 'llqm-framework-sdk';\n    export const load = async (language:any) => {\n      const locales:any[] = [];\n      \n      ".concat(apps.map(function (app, index) {
        return "\n          const supportLanguages".concat(index, " = (await import('").concat(app.name, "/support-languages')).default;\n          const messagesLoader").concat(index, " = (await import('").concat(app.name, "/messages-loader')).default;\n          if (supportLanguages").concat(index, ".includes(language)) {\n            const locale").concat(index, " = await messagesLoader").concat(index, "[language]();\n            locales.push(locale").concat(index, ".default);\n          }\n        ");
    }).join('\n'), "\n      \n\n      return { language: mergeJson(...locales) };\n    };\n  ");
    var to = path.resolve(__dirname, '../../locales.js');
    if (fs.existsSync(to) &&
        fs.readFileSync(to, 'utf8').trim() === code.trim()) {
        return;
    }
    fs.writeFileSync(to, code);
});
