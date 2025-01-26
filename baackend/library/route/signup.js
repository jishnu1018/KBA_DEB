import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';



dotenv.config();


const library=Router();
let user1= new Map();

//post
library.post('/signup',async(req,res)=>{
    try
    {
    const {Name,Email,Password,Role}=req.body;
    console.log(Name);
//    const newpassword =await bcrypt.hash(Password,10);

   //console.log(newpassword);
    if(user1.get(Name)){
        res.status(400).send("already there bro")
        console.log("already there bro")
    }
    else{
        const newpassword =await bcrypt.hash(Password,10);
        user1.set(Name,{Name,newpassword,Email,Role});
        res.status(200).send(user1.get(Name));
        console.log(user1.get(Name));
    }
   //user.set(Id,{Username,newpassword,Role,Condition});
   //console.log(user.get(Id));

}
catch{
    res.status(500).send("internal server Error")
}
// finally{

// }

});

library.post('/login', async (req,res)=>{
    try{
        const {Name,Password}=req.body;
        const result = user1.get(Name);
        console.log(result);
        
        if(!result){
            res.status(400).send("Enter a valid username");
        }
        else{
            console.log(result.newpassword)
            const valid= await bcrypt.compare(Password,result.newpassword);
            console.log(valid);
            if(valid){
                const token=jwt.sign({Username:Name,Userrole:result.Role},process.env.SECRET_KEY)
                console.log(token);
                res.cookie('tokencookie',token,{
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

export {library}