import bcrypt from 'bcrypt';
import users from '../db.js';

export async function login(dados){
    const user = users.find(u=> u.email === dados.email)

    if(!user) return false;

    if(!await bcrypt.compare(dados.password, user.password)) return false;

    return user;
}