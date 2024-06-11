import { Request, Response } from "express";
import { UserRepository } from "@/repositories/user.repository";
import * as jwt from 'jsonwebtoken';

class AuthController {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    login = async (req: Request, res: Response): Promise<Response> => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ error: "Email and password are required" });
        }

        const user = await this.userRepository.findByEmail(email);
        if (!user || !(await this.userRepository.checkPassword(user, password))) {
            return res.status(401).send({ error: "Invalid email or password" });
        }

        try {
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET as string,
                { expiresIn: '1h' }
            );
    
            return res.status(200).send({ token });
        } catch(error){
            return res.status(400).send({ 
                error: `Error: ${error}`
             });
        }
       
    }

}

export default new AuthController();
