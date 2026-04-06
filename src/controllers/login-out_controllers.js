import jwt from 'jsonwebtoken';
import { login } from '../models/login_models.js';

//função de rota para login
export async function loginC(req, res){
    try{

        //chama a função de login
        const result = await login(req.body);
        
        //verifica se os dados estão corretos
        if(!result) return res.status(400).json({ message: 'Dados incorretos' });

        //serializa os dados do usuário que serão gurdados no token
        const dados ={
            id: result.id,
            nome: result.nome,
            email: result.email
        }

        //assina o refresh token (dura 30 dias) e acsess token (dura 30 min)
        const refreshToken = jwt.sign({...dados}, process.env.TOKEN_KEY, {expiresIn: '30d'});
        const accessToken = jwt.sign({...dados}, process.env.TOKEN_KEY, {expiresIn: '30m'});

        //coloca o refresh token em um cookie (httpOnly ou seja, só o servidor pode acessar)
        res.cookie('refreshToken', refreshToken, {httpOnly: true, secure: true, sameSite: 'strict'});
        
        //retorna o acsess token para o cliente
        return res.status(201).json({ message: 'Usuário logado com sucesso' , token: accessToken });

    }catch(err){
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

//função que faz logout do usuário
export async function logoutC(req, res){
    
    //verifica se o usuário esta logado
    if(!req.cookies.refreshToken) return res.status(400).json({message: 'Usuário já deslogado'})

    //apaga o refresh token do cookie
    res.clearCookie('refreshToken');

    return res.status(200).json({message: 'Usuário deslogado com sucesso'})
}