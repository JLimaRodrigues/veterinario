import { Length, IsNotEmpty, IsString } from "class-validator";

export class CreateProductImageDTO {
    @IsNotEmpty()
    @IsString()
    @Length(3, 255)
    path: string;

    @IsNotEmpty()
    productId: string;
}

export class UpdateProductImageDTO extends CreateProductImageDTO {
    id: number;
}