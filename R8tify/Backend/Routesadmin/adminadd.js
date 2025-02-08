import { Router } from "express";
import { adminauthen } from "../Middleware/adminauthen.js";
import { PROduct } from "../Model/Admin/add.js";

const adminadd=Router();


adminadd.post('/productadd',adminauthen,async(req,res)=>{
    try{
        const {Product,Description,Price}=req.body
        console.log(Product);
        const sameproduct= await PROduct.findOne({ Product_name:Product}) 
        if(sameproduct){
        res.status(400).send("Product already there bro")
        console.log("already there bro")
        }
        else{
            const pro=new PROduct({
            Product_name:Product,
            Product_description:Description,
            price:Price
        })  
        await pro.save();
        console.log(pro);
        res.status(200).send("Product added");
        console.log("Product added");
    } 
    }
    catch{
        res.status(404).send("error")
         console.log("error");
    }
})

adminadd.put('/productupdate',adminauthen,async(req,res)=>{
    try{
        const {Product,Description,Price}=req.body
        const oneproduct= await PROduct.findOne({ Product_name:Product}) 
        if(oneproduct){
            
            oneproduct.Product_description=Description,
            oneproduct.price=Price
            console.log(oneproduct);
            await oneproduct.save()
            res.status(400).send("updated ")
    
    }
    else{
        res.status(400).send("add coursename")
    console.log("add coursename")
    }

   }
      catch{
        console.log("error")
    }
})














export {adminadd}