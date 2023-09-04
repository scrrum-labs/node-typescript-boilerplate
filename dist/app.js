"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const SwaggerDoc = __importStar(require("./routes/swagger.json"));
const routes_1 = require("./routes/routes");
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const dotenv = __importStar(require("dotenv"));
const strippedRequest = {
    requestId: uuid_1.v4
};
dotenv.config();
class App {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.dbConfig();
        this.getApiDoc();
        routes_1.RegisterRoutes(this.app);
    }
    config() {
        this.app.use(cors_1.default());
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.get("/", (req, res) => {
            res.status(200).send({
                name: "Accounting System API",
                apiVersion: JSON.parse(fs_1.default.readFileSync("./package.json").toString()).version
            });
        });
    }
    dbConfig() {
        mongoose_1.default.connect(process.env.DBURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
            .then(() => {
            console.log("db connected");
        })
            .catch((err) => {
            console.log(err);
        });
    }
    getApiDoc() {
        const currentVersion = JSON.parse(fs_1.default.readFileSync("./package.json").toString()).version;
        SwaggerDoc.info.version = currentVersion;
        process.env.API_VERSION = currentVersion;
        this.app.use("/api/v1/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(SwaggerDoc));
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map