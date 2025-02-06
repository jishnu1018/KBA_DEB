import { Router } from "express";
import { authenticate } from "../Middleware/authenticate.js";

const review=Router();
const reviewer =new Map();

review.post('/review',authenticate,(req,res)=>{
    try{
        const{Name,Star,Title,About}=req.body
        if(reviewer.get(Name)){
            
        }
    }
    catch{

    }
})
export {review}