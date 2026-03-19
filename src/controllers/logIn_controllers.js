import jwt from 'jsonwebtoken';
import { login } from '../models/logIn_models.js';

export async function loginC(req, res){

    if(!req.body) return res.status(400).json({ message: 'Dados incompletos' });

    try{

        const result = await login(req.body);
        
        if(!result) return res.status(400).json({ message: 'Dados incorretos' });

        const refreshToken = jwt.sign({...result}, process.env.TOKEN_KEY, {expiresIn: '30d'});
        const accessToken = jwt.sign({...result}, process.env.TOKEN_KEY, {expiresIn: '30d'});

        res.cookie('refreshToken', refreshToken, {httpOnly: true, secure: true, sameSite: 'strict'});
        
        return res.status(201).json({ message: 'Usuário logado com sucesso' , token: accessToken });

    }catch(err){
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }

}