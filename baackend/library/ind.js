import express,{json} from 'express';
import dotenv from 'dotenv';
import {library} from './route/signup.js';
import { addbook } from './route/addbook.js';
dotenv.config();

const app=express();
app.use(json())

// 8000 is a port asigned to app
// app.listen(8000, function(){
//     console.log("sever is in port 8000")
// })

app.use('/',library)
app.use('/',addbook)

app.get('/',function(req,res){
    res.send("hi")
})


//using env
app.listen(process.env.PORT,function(){
    console.log(`sever is listening at ${process.env.PORT}`)
})