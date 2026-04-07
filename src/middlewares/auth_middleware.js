import jwt from 'jsonwebtoken'

//middleware de autentificação com refresh token
export async function refreshToken(req, res){
    //pega o refresh token do cookie (httponly)
    const token = req.cookies.refreshToken

    //verifica se existe
    if(!token) return res.status(401).json({message: 'Token não encontrado'})

    try{
        //assina um acsess token a partir do refresh token se ele for válido
        jwt.verify(token, process.env.TOKEN_KEY, (err , user) =>{
            if(err){
                res.cookies.clear('refreshToken'); //apaga o refresh token do cookie se ele for inválido
                return res.status(403).json({message: 'Token inválido'})
            } 
            
            //assina o acsess token com duração de 30 min
            const accessToken = jwt.sign({...user}, process.env.TOKEN_KEY, {expiresIn: '30m'})

            return res.status(200).json({token :accessToken}) //retorna o token
        })
    }catch(err){
        return res.status(500).json({message: 'Erro interno do servidor'})
    }
}

export async function authenticateToken(req, res, next){
    const token = req.headers['authorization'].split(' ')[1]

    try{
        if(!token) return res.status(401).json({message: 'Token não encontrado'})

        jwt.verify(token, process.env.TOKEN_KEY, (err, user) =>{
            if(err) return res.status(403).json({message: 'Token inválido'})
            req.user = user
            next()
        })

    }catch(err){
        return res.status(500).json({message: 'Erro interno do servidor'})
    }
}