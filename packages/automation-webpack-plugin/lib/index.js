"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var routes_1 = require("./generate/routes");
var locales_1 = require("./generate/locales");
var public_path_1 = require("./generate/public-path");
var main_1 = require("./generate/main");
var pluginName = 'MicroApAutomationWebpackPlugin';
var MicroApAutomationWebpackPlugin = /** @class */ (function () {
    function MicroApAutomationWebpackPlugin(options) {
        this.options = options;
    }
    MicroApAutomationWebpackPlugin.prototype.apply = function (compiler) {
        var _this = this;
        var generate = function () {
            (0, routes_1.default)(_this.options.apps);
            (0, locales_1.default)(_this.options.apps);
            (0, public_path_1.default)(_this.options.apps),
                (0, main_1.default)(_this.options.apps);
        };
        compiler.hooks.thisCompilation.tap(pluginName, function (compilation) {
            try {
                generate();
            }
            catch (error) {
                compilation.errors.push(error);
            }
        });
    };
    return MicroApAutomationWebpackPlugin;
}());
exports.default = MicroApAutomationWebpackPlugin;
