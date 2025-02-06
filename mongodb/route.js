import { Router } from "express";
import { sample } from "./Model/sample.js";

const user=Router()

user.post('/create',async(req,res)=>{
    try{
    const data=req.body
    const result=await sample.create(data)
    res.status(200).json(result)
    console.log(result);
    
    }
    catch{
        console.log("error");
        res.status(500).json()
    }
});
user.get('/read',async (req,res)=>{
    try{
        const resultt=await sample.findById('67a32089174f9207d21b073c');
        console.log(resultt);
        res.status(200).send(resultt)
    }
    catch{
        console.log("error");
        res.status(500).json()
    }
})

export {user}