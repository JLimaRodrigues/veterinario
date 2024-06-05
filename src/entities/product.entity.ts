import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"

@Entity('products')
export class Product {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp'
    })
    createdAt: Date;
}
