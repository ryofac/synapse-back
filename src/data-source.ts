import { DataSource } from "typeorm";
import { User } from "./entity/user.entity";
import { Classroom } from "./entity/classroom.entity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./database.db",
  synchronize: true,
  logging: true,
  entities: [User, Classroom],
  subscribers: [],
  migrations: [],
});
