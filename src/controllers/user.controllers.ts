import type { Request, Response } from "express";
import { User } from "../entity/user.entity";

export class UserController {
  async getAllUsers(req: Request, res: Response) {
    const allUsers = await User.findBy({ id: 1 });
    res.status(200).send(allUsers);
  }
}
