import AppDataSource from "@/database/connection";
import { User } from "@/entities/user.entity";
import { Repository } from "typeorm";

import { CreateUserDTO, UpdateUserDTO } from "@/dto/user.dto";

export class UserRepository {
    private repository: Repository<User>;

    constructor(){
        this.repository = AppDataSource.getRepository(User);
    }

    async getAll(): Promise<User[]> {
        return await this.repository.find();
    }

    async create(input: CreateUserDTO): Promise<User> {
        const user = new User;
        user.name        = input.name;
        user.nickname    = input.nickname;
        user.email       = input.email;
        user.password    = input.password;
        return await this.repository.save(user);
    }

    async update(input: UpdateUserDTO): Promise<User | null> {
        const user = await this.findOne(Number(input.id));
        if(!user) return null;
        user.name        = input.name;
        user.nickname    = input.nickname;
        user.email       = input.email;
        user.password    = input.password;
        return await this.repository.save(user);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async findOne(id: number): Promise<User | null> {
        return await this.repository.findOneBy({ id });
    }
}