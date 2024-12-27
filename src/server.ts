import type { Application } from "express";

import express from "express";
import sweaggerUi from "swagger-ui-express";

import cors from "cors";
import { userRouter } from "./routes";
import { swaggerSpec } from "./utils/swagger";

export function initServer() {
  const app: Application = express();
  app.use(express.json());
  app.use(cors());
  app.use(userRouter);

  app.use("/docs", sweaggerUi.serve, sweaggerUi.setup(swaggerSpec));

  app.listen(process.env.PORT || 3000, () => {
    console.log("Hello World!");
  });
}
