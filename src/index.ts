import 'module-alias/register'
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import '@/connection';
import productController from '@/controllers/product.controller';
import cors from 'cors';

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors())

app.post('/api/products', productController.create);
app.get('/api/products', productController.findAll);
app.get('/api/products/:id', productController.findOne);
app.put('/api/products/:id', productController.update);
app.delete('/api/products/:id', productController.delete);
app.get('/', (req, res) => {
    res.send('Server up 2');
})

app.listen(PORT, ()=> {
    console.log(`server running in port ${PORT}`);
})