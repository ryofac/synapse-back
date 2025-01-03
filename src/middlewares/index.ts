import type { FastifyInstance } from "fastify";
import { authenticationMiddleware } from "./auth.middleware";

export function registerMiddlewares(app: FastifyInstance) {
  authenticationMiddleware(app);
}
