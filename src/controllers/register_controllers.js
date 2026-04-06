import {register} from '../models/register_models.js';
import {pool} from '../server.js';

//função de rota para cadastro
export async function registerC(req, res){
    try{
        //verifica se o email ja existe
        if(await pool.execute('SELECT email from Users WHERE email = ?', [req.body.email]))
            return res.status(409).json({ message: 'Email já cadastrado' });

        //chama a função de cadastro
        const result = await register(req.body);

        //verifica se os dados foram cadastrados
        if(!result) return res.status(400).json({ message: 'Erro ao cadastrar usuário' });

        return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });

    }catch(err){
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}