"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfig = void 0;
var AppConfig = /** @class */ (function () {
    function AppConfig() {
    }
    AppConfig.prototype.getServerPort = function () {
        var port = process.env.PORT || 3000;
        return port;
    };
    return AppConfig;
}());
exports.AppConfig = AppConfig;
