import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import router from './routes.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.ORIGIN
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api' , router);

app.listen(process.env.PORT, () =>{
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
})
