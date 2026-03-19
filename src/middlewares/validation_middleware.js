import {z} from 'zod';

const errorMessage = (type) => `${type} é obrigatório`;

const schema = z.object({
    login: z.object({
        email: z.string({ required_error: errorMessage('Email') })
                .email({ message: errorMessage('Email') })
                .min(5 , 'Email deve conter no mínimo 5 caracteres'),
        password: z.string({ required_error: errorMessage('Senha') })
                .min(11 , 'A senha deve conter no mínimo 11 caracteres')
    }),
    signin: z.object({
        name: z.string({ required_error: errorMessage('Nome') })
                .min(3 , 'O nome deve conter no mínimo 3 caracteres'),
        email: z.string({ required_error: errorMessage('Email') })
                .email({ message: errorMessage('Email') })
                .min(5 , 'Email deve conter no mínimo 5 caracteres'),
        password: z.string({ required_error: errorMessage('Senha') })
                .min(11 , 'A senha deve conter no mínimo 11 caracteres')
    })
})


export function validation(type){

    return (req, res, next) =>
    {
        if(type === 'signin') req.body.name = req.body.name.trim();

        req.body = {
            ...req.body,
            email: req.body.email.trim(),
            password: req.body.password.trim()
        }

        const validation = schema.shape[type].safeParse(req.body);

        if(!validation.success) return res.status(400).json({ message: validation.error.message });

        next();
    }
}
