import type { FastifyReply, FastifyRequest } from "fastify";
import { User } from "../entity/user.entity";
import { BcryptHashProvider } from "../external/providers/bcrypt.provider";
import type { HashProvider } from "../providers/hash.provider";
import type { UserIn, UserLogin } from "../schemas/user.schemas";
import { InvalidCredentialsException } from "../errors/auth.exceptions";

export class AuthController {
  hashProvider: HashProvider;

  constructor() {
    this.hashProvider = new BcryptHashProvider();
  }

  register = async (request: FastifyRequest, reply: FastifyReply) => {
    const { username, password, fullname }: UserIn = request.body;

    const toBeCreated = new User();

    toBeCreated.password = await this.hashProvider.hash(password);

    toBeCreated.username = username;
    toBeCreated.fullName = fullname;

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

    const refreshToken = request.jwt.sign(
      {},
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_SECONDS || 600 }
    );

    reply.send({ auth_token: authToken, refresh_token: refreshToken });
  };
}
