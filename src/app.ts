import express, { Request, Response, Application } from "express";
import mongoose, { mongo } from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import * as SwaggerDoc from "./routes/swagger.json";
import { RegisterRoutes } from "./routes/routes";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import * as dotenv from "dotenv";


const strippedRequest = {
    requestId: uuidv4
};

dotenv.config();

export class App {
    public app: express.Express;

    constructor() {
        this.app = express();
        this.config();
        this.dbConfig();
        this.getApiDoc();
        RegisterRoutes(this.app);
    }

    private config() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.get("/", (req: Request, res: Response) => {
            res.status(200).send({
                name: "Accounting System API",
                apiVersion: JSON.parse(fs.readFileSync("./package.json").toString()).version
            });
        });
    }

    private dbConfig() {
        mongoose.connect(process.env.DBURL, {
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

    private getApiDoc() {
        const currentVersion = JSON.parse(fs.readFileSync("./package.json").toString()).version;
        SwaggerDoc.info.version = currentVersion;
        process.env.API_VERSION = currentVersion;
        this.app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(SwaggerDoc));
    }
    
}
