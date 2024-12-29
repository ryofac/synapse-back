import { UserController } from "../controllers/user.controllers";
import type { FastifyTypedInstance } from "../core/types";
import { BaseRouter } from "./base.router";

export class UserRouter extends BaseRouter {
  userController: UserController;

  constructor(app: FastifyTypedInstance) {
    super(app, "Users Routes", "/users/");
    this.userController = new UserController();
  }

  configureRoutes(): FastifyTypedInstance {
    this.app.register((app, options, done) => {
      this.addListRoute();
      done();
    });

    return this.app;
  }

  addListRoute() {
    this.app.route({
      url: this.prefix,
      method: "GET",
      schema: {},
      handler: this.userController.getAllUsers,
    });
  }
}
