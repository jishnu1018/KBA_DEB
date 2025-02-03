import { Router } from "express";
import bcrypt from "bcrypt";
const adminsign=Router();
let admin=new Map()

adminsign.post('/signin',async(req,res)=>{
    console.log('kooo');
    
    try
    {
    const {user,Password,Role}=req.body;

    if(admin.get(user)){
        res.status(400).send("already there bro")
        console.log("already there bro")
    }
    else{
        const newpassword =await bcrypt.hash(Password,10);
        admin.set(user,{user,newpassword,Role});
        res.status(200).send(admin.get(user));
        console.log(admin.get(user));
    }
   
}
catch{
    res.status(500).send("internal server Error")
}

});

export {adminsign}