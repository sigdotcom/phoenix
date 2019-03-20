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
export class ProductCategory extends BaseEntity {
  @PrimaryColumn()
  public name: string;

  @Column({ nullable: true })
  public description: string;

  @ManyToMany(type => Product, product => product.categories)
  public products: Product[];
}
