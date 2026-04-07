import express from 'express';
import { registerC } from './controllers/register_controllers.js';
import { loginC , logoutC} from './controllers/login-out_controllers.js';
import {authenticateToken, refreshToken } from './middlewares/auth_middleware.js';
import {validation} from './middlewares/validation_middleware.js';

const router = express.Router();

//rota de dados do usuário
router.get('/user' , authenticateToken , (req , res) => res.status(200).json({user: req.user}));
//rota de cadastro
router.post('/register' , validation('register') , registerC); 
//rota de login
router.post('/login' , validation('login') , loginC);
//rota de logout
router.delete('/logout' , logoutC);
//rota de refresh token
router.get('/refresh-token' , refreshToken)


export default router;