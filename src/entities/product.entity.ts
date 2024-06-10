import { Column, CreateDateColumn, Entity, JoinTable, OneToMany, PrimaryColumn } from "typeorm";
import { ProductImage } from "./productImage.entity";
import { v4 as uuid } from 'uuid';

@Entity('products')
export class Product {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;
    
    @Column()
    description: string;

    @OneToMany(() => ProductImage, image => image.product, {
        cascade: ['insert', 'update']
    })
    @JoinTable()
    images: ProductImage[]

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp'
    })
    createdAt: Date;

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}
