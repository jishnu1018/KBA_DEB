import { Router } from "express";
import { authen } from "../Middleware/authen.js";
import { checkadmin } from "../Middleware/checkadmin.js";
import { auth } from "../../kbacourse/Middleware/auth.js";

const issuecer=Router();
const issue=new Map();
issuecer.post('/issuecer',authen,checkadmin,(req,res)=>{
    try{
        //if(req.userrole=='admin'){
            const {course,id,name,grade,date}=req.body
            if(issue.get(id)){
                res.status(400).send("course already there bro")
                console.log("course already there bro");
            }
            else{
                issue.set(id,{course,name,grade,date});
                res.status(200).send(issue.get(id))
                console.log(issue.get(id))
                
            }
        // }
        // else{
        //     res.status(400).send("not authorized")
        //     console.log("not authorized")
        // }
    }
    catch{
        console.log("error")

    }
});

issuecer.get('/getcerti',(req,res)=>{
    const Id = req.query.id
    console.log(Id);
    if(issue.get(Id)){
        res.status(200).send(issue.get(Id))
        console.log(issue.get(Id));
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