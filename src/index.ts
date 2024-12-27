import { AppDataSource } from "./data-source";
import { initServer } from "./server";

AppDataSource.initialize()
  .then(async () => {
    initServer();
  })
  .catch(error => console.log(error));
