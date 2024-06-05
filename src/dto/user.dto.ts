import { Length, IsNotEmpty, IsEmail, IsStrongPassword } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty()
    @Length(3, 255)
    name: string;

    @IsNotEmpty()
    @Length(3, 255)
    nickname: string;

    @IsNotEmpty()
    @IsEmail()
    @Length(3, 255)
    email: string;

    @IsNotEmpty()
    @IsStrongPassword()
    @Length(3, 255)
    password: string;
}

export class UpdateUserDTO extends CreateUserDTO {
    id: number;
}