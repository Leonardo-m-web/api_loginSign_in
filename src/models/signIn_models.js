import bcrypt from 'bcrypt';
import users from '../db.js';

export async function signin(dados){
    if(users.length == 0 || !users.find(u => u.email === dados.email)) return false;

    dados.password = await bcrypt.hash(dados.password, 10);

    users.push({
        id: users.length + 1,
        ...dados
    });

    return true;
}