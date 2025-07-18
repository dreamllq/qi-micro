"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var path = require('path');
exports.default = (function (apps) {
    if (apps === void 0) { apps = []; }
    var code = "\n    export default async ()=>{\n      await Promise.all([\n        ".concat(apps.filter(function (app) { return app.remoteHost !== undefined; }).map(function (app) {
        return "\n          (async() => {\n            const publicPath = await import('".concat(app.name, "/public-path');\n            const app = window.__APPS__.find(app => app.name === '").concat(app.name, "');\n            publicPath.set('").concat(app.remoteHost, "/app/").concat(app.name, "/')\n          })()\n          ");
    }), "\n      ])\n    }\n  ");
    var to = path.resolve(__dirname, '../../public-path.js');
    if (fs.existsSync(to) &&
        fs.readFileSync(to, 'utf8').trim() === code.trim()) {
        return;
    }
    fs.writeFileSync(to, code);
});
