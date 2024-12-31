import type { FastifyInstance } from "fastify";
import { UserRouter } from "./user.router";
import type { BaseRouter } from "./base.router";
import { AuthRouter } from "./auth.router";
export { UserRouter };

export function registerRouters(app: FastifyInstance) {
  const routes: Array<BaseRouter> = [new UserRouter(app), new AuthRouter(app)];
}
