import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  guid: string;

  @Column()
  name: string;
}
