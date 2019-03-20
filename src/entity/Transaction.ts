import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryColumn
} from "typeorm";

import { Account } from "./Account";
import { Product } from "./Product";

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryColumn()
  public id: string;

  @CreateDateColumn()
  public dateCreated: Date;

  @ManyToOne(type => Account, account => account.transactions)
  public account: Account;

  @ManyToOne(type => Product, product => product.transactions)
  public product: Product;
}
