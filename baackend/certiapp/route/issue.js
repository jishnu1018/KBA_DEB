import { Router } from "express";
import { authen } from "../Middleware/authen.js";


const issuecer=Router();
const issue=new Map();
issuecer.post('/issuecer',authen,(req,res)=>{
    try{
        if(req.userrole=='admin'){
            const {course,id,name,grade,date}=req.body
            if(issue.get(course)){
                res.status(400).send("course already there bro")
                console.log("course already there bro");
            }
            else{
                issue.set(course,{id,name,grade,date});
                res.status(200).send(issue.get(course))
                console.log(issue.get(course))
            }
        }
        else{
            res.status(400).send("not authorized")
            console.log("not authorized")
        }
    }
    catch{
        console.log("error")

    }
})

export {issuecer}