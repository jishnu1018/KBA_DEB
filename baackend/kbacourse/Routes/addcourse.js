import { Router } from "express";
import {auth} from '../Middleware/auth.js';
const addcourse=Router();
let course=new Map()
addcourse.post('/addcourse',auth,(req,res)=>{
    //console.log(req.username);
    try{
        if(req.userrole=='Centre Mid'){
            const {coursename,coursetype,courseid,description,price}=req.body;
            if(course.get(coursename)){
            res.status(400).send("coursename already there bro")
            console.log("already there bro")
            }
            else{
                course.set(coursename,{coursename,coursetype,courseid,description,price});
                res.status(200).send(course.get(coursename));
                console.log(course.get(coursename));
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
export{addcourse}