import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryColumn()
    @Generated()
    id: number;

    @Column()
    name: string;
    
    @Column()
    nickname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp'
    })
    createdAt: Date;
}
