import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryColumn
} from "typeorm";
import { Account } from "./Account";

@Entity()
export class Sig extends BaseEntity {
  @PrimaryColumn()
  public name: string;

  @CreateDateColumn()
  public dateFounded: Date;

  @Column()
  public description: string;

  @ManyToMany(type => Account, account => account.sigs)
  public accounts: Account[];
}
