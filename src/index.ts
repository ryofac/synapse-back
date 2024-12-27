import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

import type { Application, Request, Response } from "express";

import * as express from "express";

import * as cors from "cors";

AppDataSource.initialize()
  .then(async () => {
    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await AppDataSource.manager.save(user);
    console.log(`Saved a new user with id: ${user.id}`);

    console.log("Loading users from the database...");
    const users = await AppDataSource.manager.find(User);
    console.log("Loaded users: ", users);

    // initializing express

    const app: Application = express();
    app.use(express.json());
    app.use(cors());

    app.get("/", (req: Request, res: Response) => {
      console.log();
      res.json({ message: "Hello World!" });
    });

    app.listen(process.env.PORT || 3000, () => {
      console.log("Hello World!");
    });
  })
  .catch(error => console.log(error));
