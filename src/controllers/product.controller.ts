import { Request, Response } from "express";
import { validate } from "class-validator";
import { ProductRepository } from "@/repositories/product.repository";
import { CreateProductDTO, UpdateProductDTO } from "@/dto/product.dto";
import { ProductImageRepository } from "@/repositories/productImage.repository";
import { CreateProductImageDTO } from "@/dto/productImage.dto";

class ProductController {
    private productRepository: ProductRepository;
    private productImageRepository: ProductImageRepository;

    constructor(){
        this.productRepository = new ProductRepository;
        this.productImageRepository = new ProductImageRepository;
    }

    findAll = async (req: Request, res: Response): Promise<Response> => {

        const products = await this.productRepository.getAll()

        const productsWithImages = await Promise.all(
            products.map(async (product) => {
                const productImages = await this.productImageRepository.getAllPerProduct(product.id);
                product.images = productImages;
                return product;
            })
        );
    
        return res.status(200).send({
            data: productsWithImages
        });
    }

    findOne = async (req: Request, res: Response): Promise<Response> => {
        const id: string = req.params.id;
        
       const product = await this.productRepository.findOne(id);

        if(!product){
            return res.status(404).send({
                error: "Product not found"
            });
        }

        const productsImages = await this.productImageRepository.getAllPerProduct(product.id)
        product.images = productsImages;

        return res.status(200).send({
            data: product
        });
    }

    create = async (req: Request, res: Response): Promise<Response> => {
        const { name, description, images } = req.body;

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

        images.forEach(async (image: CreateProductImageDTO) => {
            try {
                await this.productImageRepository.create(image, productDb);
            } catch(error){
                console.log(error)
            }
        });

        return res.status(201).send({
            data: productDb
        })
    }

    update = async (req: Request, res: Response): Promise<Response> => {
        const id: string = req.params.id;
        const { name, description, images } = req.body;

        const updateProductDTO = new UpdateProductDTO;

        updateProductDTO.id          = id;
        updateProductDTO.name        = name;
        updateProductDTO.description = description;
        updateProductDTO.images = images;

        const errors = await validate(updateProductDTO);
        if(errors.length > 0){
            return res.status(422).send({
                errors
            })
        }

        try {
            const productDb = await this.productRepository.update(updateProductDTO);

            if(!productDb){
                return res.status(404).send({
                    error: "Product not found"
                });
            }

            return res.status(200).send({
                data: productDb
            })

        } catch (error) {
            return res.status(500).send({
                error: `Internal error, ${error}`
            })
        }
    }

    delete = async (req: Request, res: Response): Promise<Response> => {
        const id = req.params.id;

        try {
            await this.productRepository.delete(id);

            return res.status(204).send({})
        } catch (error) {
            return res.status(400).send({
                error: "Error deleting"
            })
        }
    }
}

export default new ProductController;