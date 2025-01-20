import express from 'express';
import dotenv from 'dotenv';
import {userauth} from './Routes/userauth.js';

dotenv.config();

const app=express();

// 8000 is a port asigned to app
// app.listen(8000, function(){
//     console.log("sever is in port 8000")
// })

app.get('/',userauth)

app.get('/',function(req,res){
    res.send("hi")
})


//using env
app.listen(process.env.PORT,function(){
    console.log(`sever is listening at ${process.env.PORT}`)
})