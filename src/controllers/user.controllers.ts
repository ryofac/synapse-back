import { User } from "../entity/user.entity";

export class UserController {
  async getAllUsers(request, reply) {
    const allUsers = await User.find();
    reply.status(200).send(allUsers);
  }
}
