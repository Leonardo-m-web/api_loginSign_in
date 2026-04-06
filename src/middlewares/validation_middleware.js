import {z} from 'zod';

// Função para gerar mensagens de erro personalizadas
const errorMessage = (type) => `${type} é obrigatório`;

//schema de validação do zod
const schema = z.object({
    //validação pra login
    login: z.object({
        //verifica se o email existe, se é uma string e se tem no mínimo 5 characteres
        email: z.string()
                .min(1 , errorMessage('Email'))
                .min(5 , 'Email deve conter no mínimo 5 caracteres'),
        //verifica se a senha existe, se é uma string e se tem no mínimo 11 characteres
        password: z.string()
                .min(1 , errorMessage('Senha'))
                .min(11 , 'A senha deve conter no mínimo 11 caracteres')
    }),
    //validação pra cadastro
    signin: z.object({
        //verifica se o nome existe, se é uma string e se tem no mínimo 3 characteres
        name: z.string()
                .min(1 , errorMessage('Nome'))
                .min(3 , 'O nome deve conter no mínimo 3 caracteres'),
        //verifica se o email existe, se é uma string e se tem no mínimo 5 characteres
        email: z.string()
                .min(1 , errorMessage('Email'))
                .min(5 , 'Email deve conter no mínimo 5 caracteres'),
        //verifica se a senha existe, se é uma string e se tem no mínimo 11 characteres
        password: z.string()
                .min(1 , errorMessage('Senha'))
                .min(11 , 'A senha deve conter no mínimo 11 caracteres')
    })
})


export function validation(type){

    //retorna o middleware de validação
    return (req, res, next) =>
    {
        //verifica se o type da requisição é sigin ou login (para adicionar o trim no nome apenas no cadastro)
        if(type === 'signin') req.body.name = req.body.name.trim();

        //adiciona o trim no email e senha 
        req.body = {
            ...req.body,
            email: req.body.email.trim(),
            password: req.body.password.trim(),
        }

        //faz a validação com o zod
        const validation = schema.shape[type].safeParse(req.body);

        //verifica se a validação deu sucesso
        if(!validation.success) return res.status(400).json({ message: validation.error.message });

        next();
    }
}
