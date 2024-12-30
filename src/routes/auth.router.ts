import { BaseRouter } from "./base.router";
import type { FastifyTypedInstance } from "../core/types";
import { UserInSchema, UserLoginSchema } from "../schemas/user.schemas";
import { AuthController } from "../controllers/auth.controllers";
import { AuthResponseSchema } from "../schemas/auth.schema";
import { z } from "zod";

export class AuthRouter extends BaseRouter {
  authController: AuthController;

  constructor(app: FastifyTypedInstance) {
    super(app, "Auth Router", "/auth/");
    this.authController = new AuthController();
  }

  registerRoutes() {
    this.addRegisterRoute();
    this.addLoginRoute();
  }

  addLoginRoute() {
    this.constructRoute({
      url: `${this.prefix}login/`,
      method: "POST",
      schema: {
        tags: ["auth"],
        body: UserLoginSchema,
        response: { 200: AuthResponseSchema },
      },
      handler: this.authController.login,
    });
  }

  addRegisterRoute() {
    this.constructRoute({
      url: `${this.prefix}register/`,
      method: "POST",
      schema: {
        tags: ["auth"],
        body: UserInSchema,
        response: { 201: z.null() },
      },
      handler: this.authController.register,
    });
  }
}
