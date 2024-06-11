import {Request, Response, Router} from 'express';

import productController from "@/controllers/product.controller";
import userController from '@/controllers/user.controller';
import authController from '@/controllers/auth.controller';

const routes = Router();

//Auth routes
routes.post('/login', authController.login);

//Users routes
routes.post('/api/users', userController.create);
routes.get('/api/users', userController.findAll);
routes.get('/api/users/:id', userController.findOne);
routes.put('/api/users/:id', userController.update);
routes.delete('/api/users/:id', userController.delete);

//Products routes
routes.post('/api/products', productController.create);
routes.get('/api/products', productController.findAll);
routes.get('/api/products/:id', productController.findOne);
routes.put('/api/products/:id', productController.update);
routes.delete('/api/products/:id', productController.delete);
routes.get('/', (req: Request, res: Response) => {
    res.status(200).send({
        success: true
    });
})
routes.get('*', (req: Request, res: Response) => {
    res.status(404).send({
        error: "Not found"
    });
})

export default routes;