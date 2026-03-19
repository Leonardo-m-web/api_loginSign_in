import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export async function refreshToken(req, res){
    const token = req.cookies.refreshToken

    if(!token) return res.status(401).json({message: 'Token não encontrado'})

    try{
        jwt.verify(token, process.env.TOKEN_KEY, (err , user) =>{
            if(err) return res.status(403).json({message: 'Token inválido'})

            const accessToken = jwt.sign({...user}, process.env.TOKEN_KEY, {expiresIn: '60m'})

            return res.status(200).json({token :accessToken})
        })
    }catch(err){
        return res.status(500).json({message: 'Erro interno do servidor'})
    }
}