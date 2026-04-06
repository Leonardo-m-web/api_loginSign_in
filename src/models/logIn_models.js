import bcrypt from 'bcrypt';
import {pool} from '../server.js';

//função que realiza o login
export async function login(dados){

    //procura os dados pelo email
    const [rows] = await pool.execute('select * from Users where email = ?', [dados.email]);

    //verifica se existe algum usuário com o email
    if(!rows[0]) return false

    //se o email existir verifica se a senha é a mesma
    if(!await bcrypt.compare(dados.password, rows[0].password)) return false;

    return rows[0];
}