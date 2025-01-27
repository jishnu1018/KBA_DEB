import express,{json} from 'express';
import dotenv from 'dotenv';
import { userauthe } from './route/userauthe.js';
import { issuecer } from './route/issue.js';
dotenv.config();

const app=express();
app.use(json())
app.use('/',userauthe)
app.use('/',issuecer)

//using env
app.listen(process.env.PORT,function(){
    console.log(`sever is listening at ${process.env.PORT}`)
})