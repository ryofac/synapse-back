import type { FastifyReply, FastifyRequest } from "fastify";
import { User } from "../entity/user.entity";
import { mapUserToUserDetails, mapUserToUserOut } from "../mappers/user.mapper";
import type {
  UserCreate,
  UserDetails,
  UserPayload,
} from "../schemas/user.schemas";

export class UserController {
  getAllUsers = async (request: FastifyRequest, reply: FastifyReply) => {
    const allUsers = await User.find();
    const usersOut = allUsers.map(user => mapUserToUserOut(user));

    console.log(usersOut);
    reply.status(200).send(usersOut);
  };

  me = async (request: FastifyRequest, reply: FastifyReply) => {
    const { username, id, fullName }: UserPayload = request.user;

    const user_db: User = await User.findOneBy({ username });
    if (!user_db) {
      return reply.code(401);
    }
    const userReply: UserDetails = mapUserToUserDetails(user_db);
    reply.send(userReply).code(200);
  };

  createUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const userData: UserCreate = request.body;
    User.create({ ...userData });
    reply.send(201);
  };
}
