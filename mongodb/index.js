import express,{json} from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import { user } from "./route.js"

dotenv.config()
const app=express()
app.use(json())

app.use('/',user)
app.listen(process.env.PORT,function(){
    console.log(`sever is listening at ${process.env.PORT}`)
})
mongoose.connect('mongodb://localhost:27017/demo')