import express,{json} from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose'
import { user } from "./Routes/userauth.js";
// import { userauth } from "./Routes/userauth.js";
// import { review } from "./Routes/review.js";


dotenv.config();
const app=express();

app.use(json())
app.use('/',user)
//app.use('/',review)

app.listen(process.env.PORT, function(){
    console.log(`server is listening at ${process.env.PORT}`);
    
});
mongoose.connect('mongodb://localhost:27017/R8tify')