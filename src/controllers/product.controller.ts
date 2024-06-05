import { Request, Response } from "express";
import AppDataSource from "../connection";
import { Product } from "../entities/product.entity";
import { Repository } from "typeorm";

class ProductController {
    private productRepository: Repository<Product>;

    constructor(){
        this.productRepository = AppDataSource.getRepository(Product);
    }

    async findAll(req: Request, res: Response): Promise<Response> {
        const productRepository = AppDataSource.getRepository(Product);

        const products = await productRepository.find()

        return res.status(200).send({
            data: products
        })
    }

    async findOne(req: Request, res: Response): Promise<Response> {
        const id: string = req.params.id;
        
        const productRepository = AppDataSource.getRepository(Product);

        const product = await productRepository.findOneBy({ id });

        if(!product){
            return res.status(404).send({
                error: "Product not found"
            });
        }

        return res.status(200).send({
            data: product
        });
    }

    async create(req: Request, res: Response): Promise<Response> {
        const { name, description } = req.body;

        const product = new Product;
        product.name = name;
        product.description = description;

        const productRepository = AppDataSource.getRepository(Product);

        const productDb = await productRepository.save(product);

        return res.status(201).send({
            data: productDb
        })
    }

    async update(req: Request, res: Response): Promise<Response> {
        const id: string = req.params.id;
        const { name, description } = req.body;

        const productRepository = AppDataSource.getRepository(Product);

        const product = await productRepository.findOneBy({ id });

        if(!product){
            return res.status(404).send({
                error: "Product not found"
            });
        }

        product.name = name;
        product.description = description;

        const productDb = await productRepository.save(product);

        return res.status(200).send({
            data: productDb
        })
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;

        const productRepository = AppDataSource.getRepository(Product);

        try {
            await productRepository.delete(id)

            return res.status(204).send({})
        } catch (error) {
            return res.status(400).send({
                error: "Error deleting"
            })
        }
    }
}

export default new ProductController;