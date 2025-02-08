import { Router } from "express";
import { authenticate } from "../Middleware/authenticate.js";
import { Review } from "../Model/sample1.js";
import { user } from "./userauth.js";

const review=Router();


review.post('/review',authenticate,async(req,res)=>{
    
    try{
        const {Name,Star,Title,About}=req.body
        console.log(Name);
        const samereview= await Review.findOne({name:Name}) 
        if(samereview){
        res.status(400).send("coursename already there bro")
        console.log("already there bro")
        }
        else{
            const REVIEW =new Review({
                name:Name,
                star:Star,
                title:Title,
                about:About
            })
            await REVIEW.save();
            console.log(REVIEW);
            res.status(200).send("Review added");
            console.log("Review added");
            
        }
    }
    catch{
        res.status(404).send("error")
                console.log("error");
    }
})

user.get('/product',async(req,res)=>{
    const product=req.query.name
    const prod= await Review.findOne({name:product})
    if(prod){
        res.status(200).send(prod)
        console.log(prod);
    }
    else{
        res.status(404).send("error")
        console.log("error");
    }


})


export {review}