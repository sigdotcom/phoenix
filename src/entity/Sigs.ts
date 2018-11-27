import { BaseEntity, Entity, PrimaryColumn, Column, CreateDateColumn, ManyToMany } from "typeorm";
import { Account } from "./Account";

@Entity()
export class Sig extends BaseEntity{
  @PrimaryColumn()
  public name: string;

  @CreateDateColumn()
  public dateFounded: Date;

  @Column()
  public description: string;

  @ManyToMany(type => Account, account => account.sigs)
  public accounts: Account[]; 
}