import { BaseRouter } from "./base.router";
import type { FastifyTypedInstance } from "../core/types";
import { UserInSchema } from "../schemas/user.schemas";
import { AuthController } from "../controllers/auth.controllers";

export class AuthRouter extends BaseRouter {
  authController: AuthController;

  constructor(app: FastifyTypedInstance) {
    super(app, "Auth Router", "/auth/");
    this.authController = new AuthController();
  }

  configureRoutes(): FastifyTypedInstance {
    this.app.register((app, config, done) => {
      this.addRegisterRoute();
      done();
    });

    return this.app;
  }

  addLoginRoute() {
    this.app.route({
      url: `${this.prefix}login/`,
      method: "POST",
      schema: {},
      handler: (req, res) => {},
    });
  }

  addRegisterRoute() {
    this.app.route({
      url: `${this.prefix}register/`,
      method: "POST",
      schema: { body: UserInSchema },
      handler: this.authController.register,
    });
  }
}
