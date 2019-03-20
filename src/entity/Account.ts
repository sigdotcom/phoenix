import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";

import { Application } from "./Application";
import { Group } from "./Group";
import { Permission } from "./Permission";
import { Sig } from "./Sigs";
import { Transaction } from "./Transaction";

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({
    length: 50
  })
  public firstName: string;

  @Column({
    length: 50
  })
  public lastName: string;

  @Column({
    unique: true
  })
  public email: string;

  @Column({
    default: false
    // select: false
  })
  public isSuperAdmin: boolean;

  @CreateDateColumn()
  public dateJoined: Date;

  @Column({
    nullable: true
  })
  public membershipExpiration: Date;

  @Column({
    default: true
  })
  public isActive: boolean;

  @OneToMany(type => Permission, permission => permission.account)
  @JoinTable()
  public permissions: Permission[];

  @OneToMany(type => Group, group => group.accounts)
  @JoinTable()
  public groups: Group[];

  @OneToMany(type => Application, application => application.account)
  @JoinTable()
  public applications: Application[];

  @OneToMany(type => Transaction, transaction => transaction.account)
  @JoinTable()
  public transactions: Transaction[];

  @ManyToMany(type => Sig, sig => sig.accounts)
  @JoinTable()
  public sigs: Sig[];
}
