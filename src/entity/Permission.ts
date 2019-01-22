import { BaseEntity, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Account } from "./Account";
import { Group } from "./Group";

@Entity()
export class Permission extends BaseEntity {
  @PrimaryColumn()
  public name: string;

  @ManyToOne(type => Account, account => account.permissions)
  public account: Account;

  @ManyToMany(type => Group)
  public groups: Group[];
}
