import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Classroom } from "./class.entity";

export enum Roles {
  admin = "admin",
  teacher = "teacher",
  moderator = "moderator",
  student = "student",
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ width: 20, unique: true })
  username: string;

  @Column() 
  fullName: string;

  @Column()
  password: string;

  @Column({ default: Roles.student })
  role: Roles;

  @OneToMany(
    () => Classroom,
    classroom => classroom.teacher
  )
  createdClasses: Classroom[];

  @ManyToMany(
    () => Classroom,
    classroom => classroom.participants
  )
  @JoinTable()
  joinedClasses: Classroom[];
}
