import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

import { Account } from "./Account";
import { Sig } from "./Sigs";

@Entity()
export class Event extends BaseEntity {
  @PrimaryColumn()
  public id: number;

  @CreateDateColumn()
  public dateCreated: Date;

  @Column()
  public dateHosted: Date;

  @Column()
  public dateExpire: Date;

  @ManyToOne(type => Account, account => account.createdEvents)
  @JoinColumn()
  public creator: Account;

  @ManyToOne(type => Sig, sig => sig.hostedEvents)
  @JoinTable()
  public hostSigs: Sig[];

  @Column({
      length: 100
  })
  public eventTitle: string;
}
