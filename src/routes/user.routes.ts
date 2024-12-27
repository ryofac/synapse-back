import { Router } from "express";
import { UserController } from "../controllers/user.controllers";

export const userRouter = Router();
const prefix = "/users/";

const controller = new UserController();

userRouter.get(prefix, controller.getAllUsers);
