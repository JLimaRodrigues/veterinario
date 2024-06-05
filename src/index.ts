import 'module-alias/register'
import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

import '@/database/connection';
import routes from '@/routes';

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors())

app.use(routes);

app.listen(PORT, ()=> {
    console.log(`server running in port ${PORT}`);
})