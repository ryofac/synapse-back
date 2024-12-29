import type { FastifyInstance } from "fastify";
import type { FastifyTypedInstance } from "../core/types";

export abstract class BaseRouter {
  protected app: FastifyInstance;
  private name: string;
  protected prefix: string;

  constructor(app: FastifyTypedInstance, name: string, prefix: string) {
    this.app = app;
    this.name = name;
    this.prefix = prefix;
    this.configureRoutes();
  }

  getName() {
    return this.name;
  }

  abstract configureRoutes(): FastifyInstance;
}
