import express,{json} from 'express';
import dotenv from 'dotenv';
import {userauth} from './Routes/userauth.js';
import {addcourse} from './Routes/addcourse.js'
import { adminsign } from './Routes/adminsign.js';
import cors from "cors";
dotenv.config();

const app=express();
app.use(cors({
    origin:"http://127.0.0.1:5500",
    credentials:true
}))
app.use(json())

// 8000 is a port asigned to app
// app.listen(8000, function(){
//     console.log("sever is in port 8000")
// })

app.use('/',userauth)
app.use('/',addcourse)
app.use('/admin',adminsign)

// app.get('/',userauth)

app.get('/',function(req,res){
    res.send("hi")
})


//using env
app.listen(process.env.PORT,function(){
    console.log(`sever is listening at ${process.env.PORT}`)
})