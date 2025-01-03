import { z } from "zod";
import { UserController } from "../controllers/user.controllers";
import type { FastifyTypedInstance } from "../core/types";
import {
  UserCreateSchema,
  UserDetailsSchema,
  UserOutSchema,
} from "../schemas/user.schemas";
import { BaseRouter } from "./base.router";
import { Roles } from "../entity/user.entity";

export class UserRouter extends BaseRouter {
  userController: UserController;

  constructor(app: FastifyTypedInstance) {
    super(app, "Users Routes", "/users/");
    this.userController = new UserController();
  }

  registerRoutes(): void {
    this.addListRoute();
    this.addMeRoute();
    this.addCreateUserRoute();
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

  addCreateUserRoute() {
    this.constructRoute({
      url: `${this.prefix}`,
      method: "POST",
      schema: {
        tags: ["users"],
        body: UserCreateSchema,
        description: "Rota de criação de usuários para administradores",
        security: [{ bearerAuth: [] }],
        response: { 201: z.null() },
      },
      preHandler: [this.app.authenticate, this.app.guard.role(Roles.admin)],
      handler: this.userController.createUser,
    });
  }
}
