import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

 let userauthe=Router();
 let map=new Map();

 userauthe.post('/signup', async(req,res)=>{
    try{
        const {UserName,Email,Password,Role}=req.body
        if(map.get(UserName)){
            res.status(400).send("already there")
            console.log("already there");
            
        }else{
            const newpassword = await bcrypt.hash(Password,10)
            console.log(newpassword);
            map.set(UserName,{Email,newpassword,Role})
            res.status(200).send(map.get(UserName))
            console.log(map.get(UserName));
         }


    }
    catch{
        res.status(500).send("internal server Error")
    }
 })

 userauthe.post('/login',async(req,res)=>{
    try{
        const {UserName,Password}=req.body
        const result=map.get(UserName)
        console.log(result);
        if(!result){
            res.status(400).send("Enter a valid username")
        }
        else{
            console.log(result.newpassword)
            const valid= await bcrypt.compare(Password,result.newpassword)
            console.log(valid);
            if(valid){
                const token=jwt.sign({UserName:UserName,UserRole:result.Role},process.env.SECRET_KEY);
                console.log(token);
                res.cookie('tokken',token,{
                    httpOnly:true
                })
                res.status(200).json({message:"Logged in successfully"});
            }
            else{
                res.status(401).send("Unauthorized access");
            }
        }
    }
    catch{
        res.status(500).send("Internal Server Error")

    }
 })

 export {userauthe}