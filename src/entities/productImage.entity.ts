import { Column, Entity, Generated, JoinTable, ManyToOne, PrimaryColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity('productsimages')
export class ProductImage {
    @PrimaryColumn()
    @Generated()
    id: number;

    @Column()
    path: string;

    @ManyToOne(() => Product, product => product.images, {
        onDelete: 'CASCADE'
    })
    @JoinTable()
    product: Product;
}
