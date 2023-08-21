const express = require('express');
const mysql = require('mysql2');

appForUser = express.Router();

var connection = mysql.createConnection({
    host    :   'localhost',//process.env.HOST,
    user    :   'Shreejay',//process.env.USER,
    password:   'Shreejay',//process.env.PASSWORD,
    database:   'quotes'//process.env.DATABASE
});


appForUser.post("/register", (request, response)=>{

    const {firstname, lastname, email, password, mobile} = request.body;
    
    const query = `INSERT INTO Users
                (first_name,last_name,email,password,mobile) values
                (?, ?, ?, ?, ?)`
    
    const values = [firstname, lastname, email, password, mobile];

    connection.query(query, values, (error, result)=>{
        if(error)
        {
            console.log(error);
            response.status(500).json({error : "The error occured"})
        }
        else{
            response.json(result);
        }
    });
  })



appForUser.post("/profile", (request, response)=>{
    const {id} = request.body;

    const query =  `SELECT first_name, last_name, email, mobile 
                    FROM Users where id = ?`
    
    connection.query(query, id, (error, result)=>{
        if(error)
        {
            console.log(error);
            response.status(500).json({error:"The error occured"});
        }
        else{
            response.json(result);
        }
    });
});



appForUser.post("/updateprofile", (request, response)=>{

    const {user_id, first_name, last_name, mobile} = request.body;
    
    const query = `UPDATE Users 
                SET first_name = ?,
                last_name = ?,
                mobile = ?    
                WHERE id = ?`

    const values = [first_name, last_name, mobile, user_id];

    connection.query(query, values, (error, result)=>{
        if(error)
        {
            console.log(error);
            response.status(500).json({error : "The error occured"})
        }
        else{
            response.json(result);
        }
    });
  })



module.exports = appForUser;
