import { BaseEntity, Column, Entity, Generated, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

import { Account } from "./Account";

@Entity()
export class Application extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column()
  public name: string;

  @Column()
  @Generated("uuid")
  public token: string;

  @ManyToOne(type => Account, account => account.permissions)
  public account: Account;
}
