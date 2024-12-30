import type { FastifyInstance, RouteHandler } from "fastify";
import type { FastifyTypedInstance, TypedRouteOptions } from "../core/types";
type ExtendedRouteOptions = Omit<
  TypedRouteOptions,
  "middlewares" | "method"
> & {
  method?: string;
  middlewares?: Array<RouteHandler>;
};

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

  private configureRoutes(): FastifyInstance {
    this.app.register(async (app, config, done) => {
      this.registerRoutes();
      done();
    });
    return this.app;
  }

  abstract registerRoutes(): void;

  constructRoute({
    method = "GET",
    middlewares = [],
    ...otherOptions
  }: ExtendedRouteOptions) {
    const finalRouteOptions = { method, middlewares, ...otherOptions };
    this.app.route(finalRouteOptions);
  }
}
