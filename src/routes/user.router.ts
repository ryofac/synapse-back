import { UserController } from "../controllers/user.controllers";
import type { FastifyTypedInstance } from "../core/types";
import { UserDetailsSchema, UserOutSchema } from "../schemas/user.schemas";
import { BaseRouter } from "./base.router";

export class UserRouter extends BaseRouter {
  userController: UserController;

  constructor(app: FastifyTypedInstance) {
    super(app, "Users Routes", "/users/");
    this.userController = new UserController();
  }

  registerRoutes(): void {
    this.addListRoute();
    this.addMeRoute();
  }

  addListRoute() {
    this.constructRoute({
      url: this.prefix,
      method: "GET",
      schema: {
        tags: ["users"],
        response: { 200: UserOutSchema.array() },
      },
      handler: this.userController.getAllUsers,
    });
  }

  addMeRoute() {
    this.constructRoute({
      url: `${this.prefix}me/`,
      method: "GET",
      schema: {
        tags: ["users"],
        security: [{ bearerAuth: [] }],
        response: { 200: UserDetailsSchema },
      },
      preHandler: this.app.authenticate,
      handler: this.userController.me,
    });
  }
}
