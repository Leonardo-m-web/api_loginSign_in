# API DE LOGIN E SIGNIN COM JWT

## PROJETO

Esse projeto é um código backend de uma API de registro, login e logout, usando token jwt (acssess com refresh). Suas rotas são :

**Registra um novo usuário no sistema**

`POST /api/register`

### Request Body
```json
{
    "name": "João Silva", //minimo 3 char
    "email": "joao@email.com", //minimo 5 char
    "password": "senha123456" //minimo 11 char
}
```

### Response

 - 201 
    ```json
    {
        "status": "success",
        "message": "Usuário cadastrado com sucesso"
    }
    ```
 - 400 
    ```json
    {
        "status": "error",
        "message": "Email deve conter no mínimo 5 caracteres" 
    }
    ```
 - 409 
    ```json
    {
        "status": "error",
        "message": "Email ja cadastrado"
    }
    ```

## 2. Login de Usuário
**Faz o login do usuário**

`POST /api/login` 

### Request Body
```json
{
    "email": "joao@email.com", //minimo 5 char
    "password": "senha123456" //minimo 11 char
}
```
### Response

 - 201 
    ```json
    {
        "status": "success",
        "message": "Usuário logado com sucesso" ,
        "token" : "<acessessToken>"
    }
    ```
 - 400 
    ```json
    {
        "status": "error",
        "message": "Dados incorretos" 
    }
    ```

## 3. Logout de Usuário
**Faz o logout do usuário**

`DELETE /api/logout` 

### Headers
```json
{
    cookies: refreshToken=<refreshToken> //httpOnly
}
```

### Response

 - 200
    ```json
    {
        "status": "success",
        "message": "Usuário deslogado com sucesso" ,
    }
    ```
 - 400 
    ```json
    {
        "status": "error",
        "message": "Usuário ja deslogado" 
    }
    ```

## 4. RefreshToken
**Pega um novo acssessToken a partir do refreshToken**

`GET /api/refresh-token` 

### Headers
```json
{
    cookies: refreshToken=<refreshToken> //httpOnly
}
```

### Response

 - 200
    ```json
    {
        "status": "success",
        "token" : acessessToken
    }
    ```
 - 400 
    ```json
    {
        "status": "error",
        "message": "Token não encontrado" 
    }
    ```
 - 403
    ```json
    {
        "status": "error",
        "message": "Token inválido" 
    }
    ```


## ESPECIFICAÇÕES 

Esse projeto usa :
 - NODE.js como motor
 - JavaScript como linguagem
 - Express como framework
 - Zod para validação dos dados
 - MySQL como banco de dados (myql2 como driver)
 - JWT pra os refresh e acssess tokens

Variáveis de ambiente :
 - PORT= //porta do servidor
 - ORIGIN= //URLs pra o CORS
 - TOKEN_KEY = //chave de assinatura do token
 - DB_HOST= //host do bd
 - DB_PORT= //porta do bd     
 - DB_USER= //user do bd  
 - DB_PASSWORD= //senha do bd   
 - DB_NAME= // nome do bd
