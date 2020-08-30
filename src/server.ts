import App from "./app";
import { AppConfig } from "./config/app.config";

// App.app.listen(new AppConfig().getServerPort(), () =>
//   console.log(`server up at port ${new AppConfig().getServerPort()}`)
// );

App.server.listen(new AppConfig().getServerPort(), () =>
console.log(`server up at port ${new AppConfig().getServerPort()}`)
);

