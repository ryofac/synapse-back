import { User } from "../entity/user.entity";

export class UserController {
  async getAllUsers(req, res) {
    const allUsers = await User.findBy({ id: 1 });
    res.status(200).send(allUsers);
  }
}
