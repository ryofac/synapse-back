import { DataSource } from "typeorm";
import { User } from "./entity/user.entity";
import { Classroom } from "./entity/classroom.entity";
import { Lesson } from "./entity/lesson.entity";


const entities = [User, Classroom, Lesson]

const devDataSource = new DataSource({
  type: "sqlite",
  database: "./database.db",
  synchronize: true,
  logging: true,
  entities,
  subscribers: [],
  migrations: [],
})

const prodDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: Number.parseInt(process.env.POSTGRES_PORT),
  synchronize: true,
  logging: true,
  entities,
  subscribers: [],
  migrations: [],

})

if (process.env.APP_MODE == "PROD") {
  console.log("Aplicativo configurado para produção");
}

export const AppDataSource = process.env.APP_MODE == "PROD" ? prodDataSource : devDataSource;
;
