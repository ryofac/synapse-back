import { AppDataSource } from "./data-source";
import { initServer } from "./server";
import "dotenv/config";

AppDataSource.initialize()
  .then(async () => {
    initServer();
  })
  .catch(error => console.log(error));
