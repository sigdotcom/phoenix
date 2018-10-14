import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, } from "typeorm";

@Entity()
export class Account extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
   public id: string;

    @Column({
        length: 50
    })
    public firstName: string;

    @Column({
        length: 50
    })
    public lastName: string;

    @Column({
        unique: true
    })
    public email: string;

    @Column({
        default: false
    })
    public isSuperAdmin: boolean;

    @CreateDateColumn()
    public dateJoined: Date;

    @Column({
      nullable: true
    })
    public membershipExpiration: Date;

    @Column({
      default: true
    })
    public isActive: boolean;
}
