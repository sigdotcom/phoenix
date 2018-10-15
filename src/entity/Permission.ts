import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Account } from "./Account";

@Entity()
export class Permission extends BaseEntity {
  @PrimaryColumn()
  public name: string;

  @ManyToOne(type => Account, account => account.permissions)
  public account: Account;
}
