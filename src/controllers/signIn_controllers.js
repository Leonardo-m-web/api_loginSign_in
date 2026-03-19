
import {signin} from '../models/signIn_models.js';

export async function signinC(req, res){

    if(!req.body) return res.status(400).json({ message: 'Dados incompletos' });

    try{

        const result = await signin(req.body);

        if(!result) return res.status(400).json({ message: 'Erro ao criar usuário' });

        return res.status(201).json({ message: 'Usuário criado com sucesso' });

    }catch(err){
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}