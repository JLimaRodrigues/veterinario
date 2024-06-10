import { Length, IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { UpdateProductImageDTO } from "./productImage.dto";

export class CreateProductDTO {
    @IsNotEmpty()
    @Length(3, 255)
    name: string;

    @IsNotEmpty()
    @Length(3, 255)
    description: string;
}

export class UpdateProductDTO extends CreateProductDTO {
    id: string;

    @ValidateNested({ each: true})
    @Type(() => UpdateProductImageDTO)
    images: UpdateProductImageDTO[];
}