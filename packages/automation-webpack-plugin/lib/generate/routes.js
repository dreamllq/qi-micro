"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var path = require('path');
var change_case_1 = require("change-case");
exports.default = (function (apps) {
    if (apps === void 0) { apps = []; }
    var code = "\n    ".concat(apps.map(function (app) {
        return "import ".concat((0, change_case_1.camelCase)(app.name), "Routes from '").concat(app.name, "/routes';");
    }).join('\n'), "\n\n    export default [\n      ").concat(apps.map(function (app) {
        return "...".concat((0, change_case_1.camelCase)(app.name), "Routes,");
    }).join('\n'), "\n    ]\n  ");
    var to = path.resolve(__dirname, '../../routes.js');
    if (fs.existsSync(to) &&
        fs.readFileSync(to, 'utf8').trim() === code.trim()) {
        return;
    }
    fs.writeFileSync(to, code);
});
