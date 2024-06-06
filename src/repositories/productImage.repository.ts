import AppDataSource from "@/database/connection";
import { CreateProductImageDTO } from "@/dto/productImage.dto";
import { Product } from "@/entities/product.entity";
import { ProductImage } from "@/entities/productImage.entity";
import { Repository } from "typeorm";

export class ProductImageRepository {
    private productRepository: Repository<Product>;
    private imageRepository: Repository<ProductImage>;

    constructor(){
        this.imageRepository = AppDataSource.getRepository(ProductImage);
    }

    async getAllPerProduct(product: Product): Promise<ProductImage[]> {
        return await this.imageRepository.find({
           relations: {
            product: true,
           }
        })
    }

    async create(ImageData: CreateProductImageDTO, product: Product): Promise<ProductImage> {
        const productImage = new ProductImage;
        productImage.path = ImageData.path;
        productImage.product = product;
        return await this.imageRepository.save(productImage);
    }
}