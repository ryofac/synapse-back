import bcrypt from "bcrypt";
import type { HashProvider } from "../../providers/hash.provider";

export class BcryptHashProvider implements HashProvider {
  saltRounds = 10;

  async hash(input: string): Promise<string> {
    return await bcrypt.hash(input, this.saltRounds);
  }
  async verify(hash: string, payload: string): Promise<boolean> {
    return await bcrypt.compare(payload, hash);
  }
}
