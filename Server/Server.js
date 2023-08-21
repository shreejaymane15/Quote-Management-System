const express = require('express');
// const jwt = require('jsonwebtoken');


const quoteRelatedRoute = require('./Routes/quote');
const loginRelatedRoute = require('./Routes/login');
const userRelatedRoute = require('./Routes/user');

const app = express();

app.use(express.json());

app.use((request, response, next)=>{
    response.setHeader('Access-Control-Allow-Origin',"*");
    response.setHeader('Access-Control-Allow-Headers',"*");
    response.setHeader('Access-Control-Allow-Methods', "*")
    next();
})


app.use('/login', loginRelatedRoute);
app.use('/user', userRelatedRoute);
app.use('/quote', quoteRelatedRoute);

const portNo = 9999;
app.listen(portNo,()=>{console.log("Server Started at " + portNo)});
