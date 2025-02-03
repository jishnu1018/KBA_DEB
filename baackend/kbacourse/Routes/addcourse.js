import { Router } from "express";
import {auth} from '../Middleware/auth.js';
import { admincheck } from "../Middleware/admincheck.js";
const addcourse=Router();
let course=new Map()
addcourse.post('/addcourse',auth,admincheck,(req,res)=>{
    //console.log(req.username);
    try{
        //if(req.userrole=='admin'){
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
    //     else{
    //         res.status(400).send("not authorized")
    //         console.log("not authorized")
    //     }
    // }
    catch{
        console.log("error")
    }

})

// addcourse.get('/getcourse/:coursename',(req,res)=>{
//     const name=req.params.coursename
//     console.log(name);
    
// })

addcourse.get('/getcourse',(req,res)=>{
    const namee=req.query.Coursename
    console.log(namee)
    const cname=course.get(namee)
    if(cname){
        res.status(200).send(cname)
        console.log(cname);
    }
    else{
        res.status(404).send("error")
        console.log("error");
    }

})

addcourse.put('/update',auth,admincheck,(req,res)=>{
    try{
        //if(req.userrole=='admin'){
            const {coursename,coursetype,courseid,description,price}=req.body;
            if(course.get(coursename)){
                course.set(coursename,{coursename,coursetype,courseid,description,price});
                res.status(200).send(course.get(coursename));
                console.log(course.get(coursename));
            }
            else{
                res.status(400).send("add coursename")
            console.log("add coursename")
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


})


addcourse.patch('/edit',auth,admincheck,(req,res)=>{
    try{

            const {coursename,coursetype,price}=req.body;
            const old=course.get(coursename)
            if(course.get(coursename)){
                course.set(coursename,{coursename,coursetype,courseid:old.courseid,description:old.description,price});
                res.status(200).send(course.get(coursename));
                console.log(course.get(coursename));
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

addcourse.delete('/delete',auth,admincheck,(req,res)=>{
    try{
        console.log(course)
        const courname=req.query.Coursename
        console.log(courname)
        if(course.get(courname)){
            course.delete(courname)
            res.status(200).send("deleted")
            console.log(course)
            
        }
        else{
            res.status(400).send("add name")
        }
    }
    catch{
        res.status(200).send("Error")

    }
})

addcourse.get('/logout',(req,res)=>{
    res.clearCookie('cookietoken');
    res.status(200).send("logout")
    console.log("logout");
    
})

export{addcourse}