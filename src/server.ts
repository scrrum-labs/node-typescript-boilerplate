import { App } from "./app";
import * as dotenv from "dotenv";

dotenv.config();

new App().app.listen(process.env.PORT || 3000, () => console.log(`server is running at ${process.env.PORT}`) );