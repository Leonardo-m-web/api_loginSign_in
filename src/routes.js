import express from 'express';
import { signinC } from './controllers/signIn_controllers.js';
import { loginC } from './controllers/logIn_controllers.js';
import {refreshToken } from './middlewares/auth_middleware.js';
import {validation} from './middlewares/validation_middleware.js';

const router = express.Router();

router.post('/signin' , validation('signin') , signinC); 
router.post('/login' , validation('login') , loginC);
router.get('/refreshToken' , refreshToken)

export default router;