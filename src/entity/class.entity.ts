import { User } from "./user.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  ManyToMany,
} from "typeorm";

@Entity()
export class Classroom extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  className: string;

  @ManyToOne(() => User, user => user.createdClasses)
  teacher: User;

  @ManyToMany(() => User, user => user.joinedClasses)
  participants: User[];
}
