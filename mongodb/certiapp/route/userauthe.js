import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signup } from "../Model/signup.js";

 let userauthe=Router();


 userauthe.post('/signup', async(req,res)=>{
    try{
        const {UserName,Email,Password,Role}=req.body
        console.log(UserName);
        
        const prevuser= await signup.findOne({name:UserName})
        if((prevuser)){
            res.status(400).send("already there")
            console.log("already there");
            
        }else{
            const newpassword = await bcrypt.hash(Password,10)
            console.log(newpassword);
            const newuser=new signup({
                name:UserName,
                password:newpassword,
                email:Email,
                role:Role
            })
            await newuser.save()
            console.log(newuser);
            res.status(200).send("Signed in");
            console.log("signed in");
         }


    }
    catch{
        res.status(500).send("internal server Error")
    }
 })

 userauthe.post('/login',async(req,res)=>{
    try{
        const {UserName,Password}=req.body
        const result= await signup.findOne({name:UserName})
        console.log(result);
        
        console.log(result);
        if(!result){
            res.status(400).send("Enter a valid username")
        }
        else{
            console.log(result.password)
            const valid= await bcrypt.compare(Password,result.password)
            console.log(valid);
            if(valid){
                const token=jwt.sign({UserName:UserName,UserRole:result.role},process.env.SECRET_KEY);
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