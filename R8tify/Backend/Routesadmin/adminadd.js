import { Router } from "express";
import { adminauthen } from "../Middleware/adminauthen.js";
import { PROduct } from "../Model/Admin/add.js";
import { SIGNUP } from "../Model/sample.js";
import { Review } from "../Model/sample1.js";

const adminadd=Router();


adminadd.post('/productadd',adminauthen,async(req,res)=>{
    try{
        const {Product,Description,Price}=req.body
        console.log(Product);
        console.log("li");
        
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

adminadd.get('/getproduct',async(req,res)=>{
    const product=req.query.name
    const prod= await PROduct.findOne({name:product})
    if(prod){
        res.status(200).send(prod)
        console.log(prod);
    }
    else{
        res.status(404).send("error")
        console.log("error");
    }
})


adminadd.delete('/productdelete',adminauthen,async(req,res)=>{
    try{
        const productname=req.query.pname
        console.log(productname);
        const pName=await PROduct.findOneAndDelete({Product_name:productname})
        if (pName){
            res.status(200).send(pName)
            console.log(pName);
            console.log("deleted");
        }
        else{
            res.status(400).send("add name")
        }
    }
    catch{
        res.status(200).send("Error")

    }
})

adminadd.delete('/userdelete',adminauthen,async(req,res)=>{
    try{
        console.log("buni");
        
        const uusername=req.query.uname
        console.log(uusername);
        console.log("ppp");
        
        const uName=await SIGNUP.findOneAndDelete({email:uusername})
        if (uName){
            res.status(200).send(uName)
            console.log(uName);
            console.log("deleted");
        }
        else{
            res.status(400).send("add name")
        }
    }
    catch{
        res.status(200).send("Error")

    }
})

adminadd.delete('/reviewdelete',adminauthen,async(req,res)=>{
    try{
        console.log("buni");
        
        const review=req.query.rname
        console.log(review);
        console.log("ppp");
        
        const RName=await Review.findOneAndDelete({name:review})
        if (RName){
            res.status(200).send(RName)
            console.log(RName);
            console.log("deleted");
        }
        else{
            res.status(400).send("add name")
        }
    }
    catch{
        res.status(200).send("Error")

    }
})

adminadd.get('/adminlogout',(req,res)=>{
    res.clearCookie('TokenCookiee');
    res.status(200).send("logout")
    console.log("logout");
    
})











export {adminadd}