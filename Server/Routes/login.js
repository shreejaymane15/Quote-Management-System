const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');

appForLogin = express.Router();

var connection = mysql.createConnection({
    host    :   'localhost',//process.env.HOST,
    user    :   'Shreejay',//process.env.USER,
    password:   'Shreejay',//process.env.PASSWORD,
    database:   'quotes'//process.env.DATABASE
});


appForLogin.post("/", (request, response)=>{
    // console.log(request.body);
    let query = `SELECT id from Users where email = '${request.body.email}' && password = '${request.body.password}'`
    connection.query(query, (error, result)=>{
        if(error==null && result != [])
        {
            // console.log(result[0]);
            let pdata = Date.now()+result[0].id;
            var jwtSecretKey = "jwt_secret_key";
            const token = jwt.sign(pdata, jwtSecretKey);
            let query = `UPDATE Users SET token = '${token}' where id = ${result[0].id}`;
            connection.query(query, (error, result1)=>{
                if(error==null){
                    let sdata = {'token':token, 'user_id':result[0].id};
                    response.send(sdata);
                }
                else{
                    console.log(error);
                    response.setHeader("Content-Type","application/json");
                    response.write(error);
                }
            });
        }
        else{
            console.log(error);
            response.setHeader("Content-Type","application/json");
            response.write(error);
        }
    });
});

appForLogin.post("/validate", (request, response)=>{
    let query = `SELECT token from Users where id = '${request.body.id}'`
    connection.query(query, (error, result)=>{
        if(error==null)
        {
            if(result[0]!= null && result[0].token == request.body.token){
                response.send('true');
            }
            else{
                response.send('false');
            }
        }
        else{
            console.log(error);
            response.setHeader("Content-Type","application/json");
            response.write(error);
        }
    });
});


  
module.exports = appForLogin;

