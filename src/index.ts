import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.get('/', (req, res) => {
    res.send('Server up 2');
})

app.listen(PORT, ()=> {
    console.log(`server running in port ${PORT}`);
})