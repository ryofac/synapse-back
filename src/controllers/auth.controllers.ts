import { User } from "../entity/user.entity";
import { BcryptHashProvider } from "../external/providers/bcrypt.provider";
import type { HashProvider } from "../providers/hash.provider";
import type { UserIn } from "../schemas/user.schemas";

export class AuthController {
  hashProvider: HashProvider;

  constructor() {
    this.hashProvider = new BcryptHashProvider();
  }

  async register(request, reply) {
    const { username, password, fullname }: UserIn = request.body;

    const toBeCreated = new User();

    toBeCreated.password = await this.hashProvider.hash(password);

    console.log(toBeCreated.password);
    toBeCreated.username = username;
    toBeCreated.fullName = fullname;

    await User.save(toBeCreated);

    reply.send(201);
  }
}
