import { Lesson } from "./lesson.entity";
import { User } from "./user.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from "typeorm";

@Entity()
export class Classroom extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  className: string;

  @ManyToOne(
    () => User,
    user => user.createdClasses
  )
  teacher: User;

  @ManyToMany(
    () => User,
    user => user.joinedClasses
  )
  participants: User[];

  // Representa a relação de um para muitos entre Classroom e Lesson
  @OneToMany(
    () => Lesson,
    lesson => lesson.classroom
  )
  lessons: Lesson[];
}
