import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ManyToOne } from "typeorm";
import { Classroom } from "./classroom.entity";

export class Lesson extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ownerId: number;

  @Column()
  date: Date;

  @Column()
  subject: string;

  @Column()
  description: string;

  @ManyToOne(() => Classroom, (classroom) => classroom.lessons)
  classroom: Classroom;
}
