import type { FastifyReply, FastifyRequest } from "fastify";
import { User } from "../entity/user.entity";
import { mapUserToUserOut } from "../mappers/user.mapper";

export class UserController {
  getAllUsers = async (request: FastifyRequest, reply: FastifyReply) => {
    const allUsers = await User.find();
    const usersOut = allUsers.map(user => mapUserToUserOut(user));

    console.log(usersOut);
    reply.status(200).send(usersOut);
  };
}
