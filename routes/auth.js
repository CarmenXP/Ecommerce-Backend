const UserModel = require('../schemas/user');
const express = require('express');
const Router= express.Router();
const md5 = require('md5');
const jwt = require('jsonwebtoken');

Router.post('/', function(resquest, response){
    const{email, password} = resquest.body;

    UserModel.findOne({email})
        .then(function(document){
            if(!document){
                response.status(401)
                    .json({
                        message: "No existe correo electrónico",
                        code: "Email_not_found"
                    });
            } else {
                const hash = md5(password);

                if (hash=== document.password){
                    const toke = jwt.sign({id: document._id.toString()}, 'SECRET');
                    response.json({data: {token}});
                } else {
                    response.status(401).json({
                        message: "La contraseña es incorrecta",
                        code: "Wrong_Password"
                    });
                }
            }
        })
        .catch(function(error){
            response.status(401).json({
                message: error.message,
                code: "Auth"
            })
        });
});

module.exports = Router;
