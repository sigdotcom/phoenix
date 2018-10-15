import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Account } from "./Account";

@Entity()
export class Group extends BaseEntity {
  @PrimaryColumn()
  public name: string;

  @ManyToOne(type => Account, account => account.permissions)
  public account: Account;

}
