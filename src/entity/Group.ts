import { BaseEntity, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Account } from "./Account";
import { Permission } from "./Permission";

@Entity()
export class Group extends BaseEntity {
  @PrimaryColumn()
  public name: string;

  @ManyToOne(type => Account, account => account.permissions)
  public accounts: Account;

  @ManyToMany(type => Permission)
  @JoinTable()
  public permissions: Permission[];
}
