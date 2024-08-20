const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;


//generate token
app.post('/user/generateToken', (req, res) => {
    const secret_key = 'secret_key';

    const data = {
        time : new Date(),
        userId : 1
    };

    const token = jwt.sign(data,secret_key);
    res.send(token);
});

//Validate token   
app.get('/user/validateToken', (req, res) => {

    //passed in the header
    const secret_key = 'secret_key';
    try{
        const userToken = req.headers.authorization.split(' ')[1];
        const verify = jwt.verify(userToken, secret_key);

        if(verify){
            console.log(`Token is valid ${verify}`);
        }else{
            console.log(`Token is invalid ${verify}`);
        }


    }catch(e){
        res.status(401).send('Unauthorized');
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

