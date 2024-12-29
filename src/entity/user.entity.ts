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

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ width: 20 })
  username: string;

  @Column()
  fullName: string;

  @Column()
  password: string;

  @OneToMany(() => Classroom, (classroom) => classroom.teacher)
  createdClasses: Classroom[];

  @ManyToMany(() => Classroom, (classroom) => classroom.participants)
  @JoinTable()
  joinedClasses: Classroom[];
}
