"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var app_config_1 = require("./config/app.config");
// App.app.listen(new AppConfig().getServerPort(), () =>
//   console.log(`server up at port ${new AppConfig().getServerPort()}`)
// );
app_1.default.server.listen(new app_config_1.AppConfig().getServerPort(), function () {
    return console.log("server up at port " + new app_config_1.AppConfig().getServerPort());
});
