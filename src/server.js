import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes.js';
import mysql from 'mysql2/promise'

const app = express();

//configs do cors
app.use(cors({
    origin: process.env.ORIGIN,
    methods: ['POST' , 'GET']
}));
app.use(express.json());
app.use(cookieParser());

//pool do banco de ados
export const pool = mysql.createPool({
        host: process.env.DB_HOST,     
        port: process.env.DB_PORT,            
        user: process.env.DB_USER,          
        password: process.env.DB_PASSWORD,       
        database: process.env.DB_NAME,
        connectionLimit: 10 ,
        waitForConnections: true
    })

//inicializa as rotas
app.use('/api' , router);

app.listen(process.env.PORT || 3000, () =>{
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
})
