import express, { json } from "express"
import dotenv from 'dotenv'
import mongoose from "mongoose";
import { student } from "./Routes/student.js";
dotenv.config();

const app=express();

app.use(json())

app.use('/',student)

app.listen(process.env.PORT,function() {
    console.log("server is connected at",process.env.PORT);
})

mongoose.connect("mongodb://localhost:27017/Backendtest")