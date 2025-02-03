import { Router } from "express";
import dotenv from "dotenv";
import bcrypt from 'bcrypt'



dotenv.config()
const userauth=Router();

const user=new Map()


userauth.post('/signup', async(req,res)=>{
    try{
        const {EMAIL,PASSWORD,CONFIRM}=req.body

        if(user.get(EMAIL)){
            console.log("EMAIL already registerd");
            res.status(400).send("EMAIL already registerd")

            
        }
        else{
            if(PASSWORD===CONFIRM){
                const newpassword= await bcrypt.hash(PASSWORD,10)
                user.set(EMAIL,{newpassword})
                console.log(user.get(EMAIL));
                console.log("signed in");
                res.status(200).send(user.get(EMAIL));
            }
            else{
                res.status(200).send("Enter Same Password");
                console.log("Enter Same Password");
            }
        }
    }
    catch{
        res.status(500).send("internal server Error")

    }
});

export {userauth}