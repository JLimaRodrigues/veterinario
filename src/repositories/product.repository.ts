import AppDataSource from "@/database/connection";
import { Product } from "@/entities/product.entity";
import { Repository } from "typeorm";

import { CreateProductDTO } from "@/dto/create.product.dto";

export class ProductRepository {
    private repository: Repository<Product>;

    constructor(){
        this.repository = AppDataSource.getRepository(Product);
    }

    async getAll(): Promise<Product[]> {
        return await this.repository.find();
    }

    async create(input: CreateProductDTO): Promise<Product> {
        const product = new Product;
        product.name = input.name;
        product.description = input.description;
        return await this.repository.save(product);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async findOne(id: string): Promise<Product | null> {
        return await this.repository.findOneBy({ id });
    }
}