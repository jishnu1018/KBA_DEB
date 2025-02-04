import { Router } from "express";
import { authen } from "../Middleware/authen.js";
import { admin } from "../Middleware/admin.js";

const addbook=Router();
 const book=new Map()

 addbook.post('/addbook',authen,admin,(req,res)=>{
    try{
        const {Bookname,Bookid,Description,Price}=req.body
        if(book.get(Bookname)){
            res.status(400).send("Bookname already there")
            console.log("Bookname already there");
        }
        else{
            book.set(Bookname,{Bookid,Description,Price});
            res.status(200).send(book.get(Bookname));
            console.log(book.get(Bookname));
        }
    }
    catch{
        console.log("error")

    }
 })

 addbook.get('/getbook',(req,res)=>{
    const name=req.query.Bookname
    console.log(name);
    const bname=book.get(name)
    if(bname){
        res.status(200).send(bname)
        console.log(bname);
    }
    else{
        res.status(404).send("error")
        console.log("error");
    }
    
 })

 addbook.get('/logout',(req,res)=>{
    res.clearCookie('tokencookie');
    res.status(200).send("logout")
    console.log("logout");
    
})
 export{addbook}