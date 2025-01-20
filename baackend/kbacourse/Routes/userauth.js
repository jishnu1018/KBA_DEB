import { Router } from "express";

const userauth=Router();

userauth.get('/',(req,res)=>{
    res.send("hellloooo")
})

export {userauth};