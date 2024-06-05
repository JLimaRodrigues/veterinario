import { Request, Response } from "express";
import { validate } from "class-validator";
import { UserRepository } from "@/repositories/user.repository";
import { CreateUserDTO, UpdateUserDTO } from "@/dto/user.dto";

class ProductController {
    private userRepository: UserRepository;

    constructor(){
        this.userRepository = new UserRepository;
    }

    findAll = async (req: Request, res: Response): Promise<Response> => {

        const products = await this.userRepository.getAll()

        return res.status(200).send({
            data: products
        })
    }

    findOne = async (req: Request, res: Response): Promise<Response> => {
        const id: string = req.params.id;
        
       const product = await this.userRepository.findOne(Number(id));

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
        const { name, nickname, email, password } = req.body;

        const createUserDTO = new CreateUserDTO;
        createUserDTO.name     = name;
        createUserDTO.nickname = nickname;
        createUserDTO.email    = email;
        createUserDTO.password = password;

        const errors = await validate(createUserDTO);
        if(errors.length > 0){
            return res.status(422).send({
                errors
            })
        }

        const userDb = await this.userRepository.create(createUserDTO);

        return res.status(201).send({
            data: userDb
        })
    }

    update = async (req: Request, res: Response): Promise<Response> => {
        const id: string = req.params.id;
        const { name, nickname, email, password } = req.body;

        const updateUserDTO = new UpdateUserDTO;

        updateUserDTO.id       = Number(id);
        updateUserDTO.name     = name;
        updateUserDTO.nickname = nickname;
        updateUserDTO.email    = email;
        updateUserDTO.password = password;

        const errors = await validate(updateUserDTO);
        if(errors.length > 0){
            return res.status(422).send({
                errors
            })
        }

        try {
            const userDb = await this.userRepository.update(updateUserDTO);

            if(!userDb){
                return res.status(404).send({
                    error: "User not found"
                });
            }

            return res.status(200).send({
                data: userDb
            })

        } catch (error) {
            return res.status(500).send({
                error: "Internal error"
            })
        }
    }

    delete = async (req: Request, res: Response): Promise<Response> => {
        const id = req.params.id;

        try {
            await this.userRepository.delete(id);

            return res.status(204).send({})
        } catch (error) {
            return res.status(400).send({
                error: "Error deleting"
            })
        }
    }
}

export default new ProductController;