import app from "./app";
import { AppConfig } from "./config/app.config";

app.listen(new AppConfig().getServerPort(), () =>
  console.log(`server up at port ${new AppConfig().getServerPort()}`)
);
