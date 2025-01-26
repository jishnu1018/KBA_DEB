import express,{json} from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app=express();
app.use(json())

app.get('/',function(req,res){
    res.send("hi")
})


//using env
app.listen(process.env.PORT,function(){
    console.log(`sever is listening at ${process.env.PORT}`)
})