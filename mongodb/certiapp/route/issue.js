import { Router } from "express";
import { authen } from "../Middleware/authen.js";
import { checkadmin } from "../Middleware/checkadmin.js";
import { certi } from "../Model/certificate.js";

const issuecer=Router();
issuecer.post('/issuecer',authen,checkadmin,async(req,res)=>{
    try{
     
            const {course,id,name,grade,date}=req.body
            const prevcert= await certi.findOne({Id:id})
            console.log(prevcert);
            
            if(prevcert){
                res.status(400).send("certificate already there bro")
                console.log("certificate already there bro");
            }
            else{
                const cert=new certi({
                    Course:course,
                    Name:name,
                    Id:id,
                    Grade:grade,
                    Date:date,
                })
                await cert.save();
                console.log(cert);
                res.status(200).send("certificate added");
                console.log("certificate added");
          
            }
       
    }
    catch{
        console.log("error")

    }
});

issuecer.get('/getcerti',async(req,res)=>{
    const ID = req.query.id
    console.log(ID);
    const get=await certi.findOne({Id:ID})
    if(get){
        res.status(200).send(get)
        console.log(get);
    }
    else{
        res.status(404).send("error")
        console.log("error");
    }

});

issuecer.get('/logout',(req,res)=>{
    res.clearCookie('tokken');
    res.status(200).send("logout")
    console.log("logout");
    
})


export {issuecer}