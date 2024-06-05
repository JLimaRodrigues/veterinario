import { Request, Response } from "express";
import AppDataSource from "@/database/connection";
import { Product } from "@/entities/product.entity";
import { Repository } from "typeorm";
import { validate } from "class-validator";
import { ProductRepository } from "@/repositories/product.repository";
import { CreateProductDTO } from "@/dto/create.product.dto";

class ProductController {
    private productRepository: ProductRepository;

    constructor(){
        this.productRepository = new ProductRepository;
    }

    findAll = async (req: Request, res: Response): Promise<Response> => {

        const products = await this.productRepository.getAll()

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

    create = async (req: Request, res: Response): Promise<Response> => {
        const { name, description } = req.body;

        const createproducDTO = new CreateProductDTO;
        createproducDTO.name = name;
        createproducDTO.description = description;

        const errors = await validate(createproducDTO);
        if(errors.length > 0){
            return res.status(422).send({
                errors
            })
        }

        const productDb = await this.productRepository.create(createproducDTO);

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

        const errors = await validate(product);
        if(errors.length > 0){
            return res.status(422).send({
                errors
            })
        }

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