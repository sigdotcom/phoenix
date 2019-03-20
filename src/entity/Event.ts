import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Account } from "./Account";
import { Sig } from "./Sigs";

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  public dateCreated: Date;

  @Column()
  public dateHosted: Date;

  @Column()
  public dateExpire: Date;

  @ManyToOne(type => Account, account => account.createdEvents, {
    nullable: false
  })
  @JoinColumn()
  public creator: Account;

  @ManyToOne(type => Sig, sig => sig.hostedEvents, {
    nullable: false
  })
  @JoinTable()
  public hostSigs: Sig[];

  @Column({
      length: 100
  })
  public eventTitle: string;

  @Column({
      length: 300
  })
  public description: string;

  @Column({
      length: 100
  })
  public location: string;

  /*@ManyToOne(type => Product, product => product.events)
  @JoinColumn({
    nullable: true
  })
  public product: Product;*/

  @Column({
      length: 100,
      nullable: true
  })
  public flierLink: string;

  @Column({
      length: 100,
      nullable: true
  })
  public eventLink: string;
}
