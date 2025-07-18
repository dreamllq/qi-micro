"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var path = require('path');
var change_case_1 = require("change-case");
exports.default = (function (apps) {
    if (apps === void 0) { apps = []; }
    var code = "\n    import { isArray, mergeWith, isObject } from 'lodash';\n\n    ".concat(apps.map(function (app) {
        return "import * as ".concat((0, change_case_1.camelCase)(app.name), " from '").concat(app.name, "/locales';");
    }).join('\n'), "\n\n    const toObject = (module) => Object.keys(module).reduce((acc, key) => {\n      acc[key] = module[key];\n      return acc;\n    }, {});\n    \n    const customizer = (objValue, srcValue) => {\n      if (isArray(objValue) && isArray(srcValue)) {\n        return objValue.concat(srcValue);\n      } else if (isObject(objValue) && isObject(srcValue)) {\n        return mergeWith(toObject(objValue), toObject(srcValue), customizer);\n      }\n    };\n\n    export default mergeWith(\n      ").concat(apps.map(function (app) {
        return "toObject(".concat((0, change_case_1.camelCase)(app.name), "),");
    }).join('\n'), "\n      customizer\n    )\n  ");
    var to = path.resolve(__dirname, '../../locales.js');
    if (fs.existsSync(to) &&
        fs.readFileSync(to, 'utf8').trim() === code.trim()) {
        return;
    }
    fs.writeFileSync(to, code);
});
