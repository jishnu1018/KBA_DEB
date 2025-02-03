import express,{json} from "express";
import dotenv from "dotenv";
import cors from 'cors'
import { userauth } from "./Routes/userauth.js";


dotenv.config();
const app=express();

app.use(cors({
    origin:"*",
    credentials:true
}))

app.use(json())
app.use('/',userauth)

app.listen(process.env.PORT, function(){
    console.log(`server is listening at ${process.env.PORT}`);
    
})