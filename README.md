# LOG IN & SIGN IN

## ROUTES

- /api/signin - POST
    body:{
        name: name,
        email: email ,
        password: password
    }

- /api/login - POST
    body:{
        email: email ,
        password: password
    }
    response:{
        message: message , 
        token: acsessToken
    }

- /api/refreshToken - GET
    response:{
        token: acsessToken
    }
    