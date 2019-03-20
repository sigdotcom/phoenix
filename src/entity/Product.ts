import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn
} from "typeorm";

import { ProductCategory } from "./ProductCategory";
import { Transaction } from "./Transaction";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column("numeric", { nullable: true })
  public price: number;

  @OneToMany(type => Transaction, transaction => transaction.product)
  @JoinTable()
  public transactions: Transaction[];

  @ManyToMany(type => ProductCategory, category => category.products)
  @JoinTable()
  public categories: ProductCategory[];
}
