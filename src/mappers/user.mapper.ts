import type { User } from "../entity/user.entity";
import type { UserOut } from "../schemas/user.schemas";

export function mapUserToUserOut(user: User): UserOut {
  return { id: user.id, username: user.username, fullname: user.fullName };
}
