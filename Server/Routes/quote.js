const express = require('express');
const mysql = require('mysql2');

appForQuote = express.Router();

var connection = mysql.createConnection({
    host    :   'localhost',//process.env.HOST,
    user    :   'Shreejay',//process.env.USER,
    password:   'Shreejay',//process.env.PASSWORD,
    database:   'quotes'//process.env.DATABASE
});



appForQuote.get("/", (request, response)=>{
    let query = `SELECT * from Quotes`
    connection.query(query, (error, result)=>{
        if(error)
        {
            console.log(error);
            response.status(500).json({error : "An error occured"});
        }
        else{
            response.json(result);
        }
        response.end();
    });
});



appForQuote.post("/myquotes", (request, response)=>{
    let query = `SELECT * from Quotes where user_id = ${request.body.id}`
    connection.query(query, (error, result)=>{
        if(error==null)
        {
            // console.log(result[0]);
            // console.log(result);
            response.setHeader("Content-Type","application/json");
            response.write(JSON.stringify(result));
        }
        else{
            console.log(error);
            response.setHeader("Content-Type","application/json");
            response.write(error);
        }
        response.end();
    });
});



appForQuote.post("/addquote", (request, response)=>{
    let query = `INSERT INTO Quotes Values(0, '${request.body.quote}', '${request.body.author}', '${request.body.id}')`
    connection.query(query, (error, result)=>{
        if(error==null)
        {
          var data=JSON.stringify(result);
          response.setHeader("Content-Type","application/json");
          response.write(data);
        }
        else{
            console.log(error);
            response.setHeader("Content-Type","application/json");
            response.write(error);
        }
        response.end();
    });
})


appForQuote.post("/updatequote", (request, response)=>{

    const {quoteid, quote, author, userid} = request.body;
    
    const query = `UPDATE Quotes
                 SET text = ?,
                 author = ?
                 WHERE quotes_id = ?
                 AND user_id = ?`
    
    const values = [quote, author, quoteid, userid]             
                 
    connection.query(query, values, (error, result)=>{
        if(error)
        {
            console.log(error);
            response.status(500).json({error : "An error occured"});
        }
        else{
            response.json(result);
        }
        response.end();
    });
})



appForQuote.post("/deletequote", (request, response) => {
    const { id } = request.body;

    const query = `DELETE FROM Quotes WHERE quotes_id = ?`;

    connection.query(query, id, (error, result) => {
        if (error) {
            console.log(error);
            response.status(500).json({ error: "An error occurred" });
        } else {
            response.json(result);
        }
    });
});


appForQuote.post("/likequote", (request, response) => {
    const { userid, quoteid } = request.body;

    const query = `INSERT INTO FavouriteQuote (user_id, quotes_id)
                SELECT ?, ?
                FROM dual
                WHERE NOT EXISTS (
                    SELECT 1
                    FROM Quotes
                    WHERE quotes_id = ?
                    AND user_id = ?
                )`;

    const values = [userid, quoteid, quoteid, userid];

    connection.query(query, values, (error, result) => {
        if (error) {
            console.log(error);
            response.status(500).json({ error: "An error occurred" });
        } else {
            response.json(result);
        }
    });
});




appForQuote.post("/favquote", (request, response)=>{

    const { userid } = request.body;

    const query = `SELECT fav.quotes_id, text, author
                 FROM Quotes q, FavouriteQuote fav 
                 WHERE q.quotes_id = fav.quotes_id && fav.user_id = ?`
    
    connection.query(query, userid, (error, result)=>{
        if(error)
        {
            console.log(error);
            response.status(500).json({error: "An error occured"});
        }
        else{
            response.json(result);
        }
    });
})


appForQuote.post("/unfavquote", (request, response)=>{
    let query = `DELETE FROM FavouriteQuote where user_id = ${request.body.userid} && quotes_id = ${request.body.quoteid}`
    connection.query(query, (error, result)=>{
        if(error==null)
        {
            var data=JSON.stringify(result);
            response.setHeader("Content-Type","application/json");
            response.write(data);
        }
        else{
            console.log(error);
            response.setHeader("Content-Type","application/json");
            response.write(error);
        }
        response.end();
    });
})

module.exports = appForQuote; 