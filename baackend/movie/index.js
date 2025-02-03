import express,{json} from "express";
import dotenv from "dotenv";
dotenv.config();

const app=express;
app.request(json())

app.listen(process.env.PORT,function(){
    console.log(`sever is listening at ${process.env.PORT}`)
})