import AppDataSource from "@/database/connection";
import { CreateProductImageDTO, UpdateProductImageDTO } from "@/dto/productImage.dto";
import { Product } from "@/entities/product.entity";
import { ProductImage } from "@/entities/productImage.entity";
import { Repository } from "typeorm";

export class ProductImageRepository {
    private imageRepository: Repository<ProductImage>;

    constructor(){
        this.imageRepository = AppDataSource.getRepository(ProductImage);
    }

    async getAllPerProduct(productId: string): Promise<ProductImage[]> {
        return await this.imageRepository.find({
            where:{
                product: { id: productId }
            }
        })
    }

    async create(ImageData: CreateProductImageDTO, product: Product): Promise<ProductImage> {
        const productImage = new ProductImage;
        productImage.path = ImageData.path;
        productImage.product = product;
        return await this.imageRepository.save(productImage);
    }

    async update(productsImagesData: UpdateProductImageDTO[], product: Product): Promise<void> {
        const existingImages = await this.getAllPerProduct(product.id);

        const updatePromises = productsImagesData.map(async (imageData) => {
            const existingImage = existingImages.find(img => img.id === imageData.id);
            if (existingImage) {
                existingImage.path = imageData.path;
                return await this.imageRepository.save(existingImage);
            } else {
                const newImage = new ProductImage();
                newImage.path = imageData.path;
                newImage.product = product;
                return await this.imageRepository.save(newImage);
            }
        });

        await Promise.all(updatePromises);

        const updatedImageIds = productsImagesData.map(img => img.id);
        const deletePromises = existingImages
            .filter(img => !updatedImageIds.includes(img.id))
            .map(img => this.imageRepository.remove(img));
        
        await Promise.all(deletePromises);
    }
}