import type { Classroom } from "../entity/classroom.entity";
import type { User } from "../entity/user.entity";
import type { UserDetails, UserOut } from "../schemas/user.schemas";
import { mapClassToClassMinimal } from "./class.mapper";

export function mapUserToUserOut(user: User): UserOut {
  return {
    id: user.id,
    username: user.username,
    fullname: user.fullName,
    role: user.role,
  };
}

export function mapUserToUserDetails(user: User): UserDetails {
  const userDbClassesJoined = user.joinedClasses || [];

  const classesConverted = userDbClassesJoined.map((classroom: Classroom) => {
    return mapClassToClassMinimal(classroom);
  });

  return {
    id: user.id,
    fullname: user.fullName,
    username: user.username,
    role: user.role,
    classes_joined: classesConverted,
  };
}
