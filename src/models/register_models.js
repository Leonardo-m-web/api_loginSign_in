import bcrypt from 'bcrypt';
import {pool} from '../server.js';

//função que realiza o cadastro dos dados
export async function register(dados){

    //encriptografa a senha do usuário
    dados.password = await bcrypt.hash(dados.password, 10);

    //cadastra os dados no bd
    const [result] = await pool.execute('insert into Users (name, email, password) values (?, ?, ?)', [dados.name, dados.email, dados.password]);

    return result.affectedRows > 0;
}