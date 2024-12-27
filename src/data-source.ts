import { DataSource } from "typeorm";
import { User } from "./entity/user.entity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./database.db",
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
});
