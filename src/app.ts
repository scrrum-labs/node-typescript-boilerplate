import express, {Request, Response} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import swaggerUi from "swagger-ui-express";
import * as SwaggerDoc from './routes/swagger.json';
import {RegisterRoutes} from './routes/routes';

class App {
    public app: express.Express;
    constructor() {
        this.app = express();
        this.getApiDoc();
        this.startServer();
        this.connectDB();
        this.registerApp();
    }

    private registerApp() {
        RegisterRoutes(this.app);
    }

    private startServer() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(cors())
        this.app.get('/', (req: Request, res: Response) => {
            res.send({
                message: 'Hello node'
            });
        });
    }

    private connectDB() {
        mongoose
          .connect("mongodb://localhost:27017/student_crud", {
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
        this.app.use('/doc', swaggerUi.serve, async (req: Request, res: Response) => {
            return res.status(200).send(
                swaggerUi.generateHTML(SwaggerDoc)
            )
        });
    }
}


export default new App().app;
