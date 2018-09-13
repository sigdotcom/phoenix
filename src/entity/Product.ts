import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, } from "typeorm"; 

@Entity()
export class Product extends BaseEntity {
    // Do we need this if we have the stripeId?
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public stripeId: string;

    @Column()
    public name: string;

    @Column()
    public description: string;

    // Actual price
    @Column()
    public price: number;
    
    // Price after discount
    @Column({
        nullable: true
    })
    public discount: number;
}
