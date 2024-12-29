import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

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
}
