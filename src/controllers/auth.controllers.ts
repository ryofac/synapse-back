import type { FastifyReply, FastifyRequest } from "fastify";
import { Roles, User } from "../entity/user.entity";
import { BcryptHashProvider } from "../external/providers/bcrypt.provider";
import type { HashProvider } from "../providers/hash.provider";
import type { UserIn, UserLogin, UserPayload } from "../schemas/user.schemas";
import {
  InvalidCredentialsException,
  RefreshTokenExpired,
} from "../errors/auth.exceptions";
import type { RefreshIn } from "../schemas/auth.schema";

export class AuthController {
  hashProvider: HashProvider;

  constructor() {
    this.hashProvider = new BcryptHashProvider();
  }

  register = async (request: FastifyRequest, reply: FastifyReply) => {
    const { username, password, fullname, isTeacher }: UserIn = request.body;

    const toBeCreated = new User();

    toBeCreated.password = await this.hashProvider.hash(password);

    toBeCreated.username = username;
    toBeCreated.fullName = fullname;
    toBeCreated.role = isTeacher ? Roles.teacher : Roles.student;

    await User.save(toBeCreated);

    reply.send(201);
  };

  login = async (request: FastifyRequest, reply: FastifyReply) => {
    const { username, password }: UserLogin = request.body;

    const user_db = await User.findOneBy({ username });
    if (!user_db) {
      throw new InvalidCredentialsException();
    }

    const isValid = await this.hashProvider.verify(user_db.password, password);
    if (!isValid) {
      throw new InvalidCredentialsException();
    }

    const payload = { id: user_db.id, username, fullName: user_db.fullName };

    const authToken = request.jwt.sign(payload, {
      expiresIn: process.env.AUTH_TOKEN_EXPIRES_SECONDS || 120,
    });

    const refreshToken = request.jwt.sign(payload, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_SECONDS || 600,
    });

    reply.send({ auth_token: authToken, refresh_token: refreshToken });
  };

  refresh = async (request: FastifyRequest, reply: FastifyReply) => {
    const { refresh_token }: RefreshIn = request.body;

    try {
      const userData: UserPayload = request.jwt.decode(refresh_token);
      const authToken = request.jwt.sign(userData, {
        expiresIn: process.env.AUTH_TOKEN_EXPIRES_SECONDS || 120,
      });
      const refreshToken = request.jwt.sign(userData, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_SECONDS || 600,
      });
      reply.send({ auth_token: authToken, refresh_token: refreshToken });
    } catch (err) {
      if (err instanceof Error) {
        throw new RefreshTokenExpired();
      }
    }
  };
}
