import { Router } from "express";
import {auth} from '../Middleware/auth.js';
import { admincheck } from "../Middleware/admincheck.js";
import { sample1 } from "../Models/sample1.js";
import upload from "../Middleware/upload.js";

const addcourse=Router();
let course=new Map()
addcourse.post('/addcourse',auth,admincheck,upload.single("courseimage"),async(req,res)=>{
   
    try{
            const {coursename,coursetype,courseid,description,price}=req.body;
            console.log(coursename);
            
            const samecourse= await sample1.findOne({CourseName:coursename}) 
            if(samecourse){
            res.status(400).send("coursename already there bro")
            console.log("already there bro")
            }
            else{               
                const imagepath=req.file? req.file.path:""
                const Course =new sample1({
                    CourseName:coursename,
                    CourseId:courseid,
                    CourseType:coursetype,
                    Description:description,
                    Price:price,
                    Image:imagepath
                })
                await Course.save();
                console.log(Course);
                res.status(200).send("Course added");
                console.log("Course added");
            }
        }
    catch{
        console.log("error")
    }

})

// addcourse.get('/getcourse/:coursename',(req,res)=>{
//     const name=req.params.coursename
//     console.log(name);
    
// })

addcourse.get('/getcourse',async (req,res)=>{
    const NAME=req.query.coursename
    const name= await sample1.findOne({CourseName:NAME}) 
    if(name){
        res.status(200).send(name)
        console.log(name);
    }
    else{
        res.status(404).send("error")
        console.log("error");
    }

})

addcourse.put('/update',auth,admincheck,async(req,res)=>{
    try{
            const {coursename,coursetype,courseid,description,price}=req.body;
            const name= await sample1.findOne({CourseName:coursename}) 

            if(name){
                    name.CourseName=coursename,
                    name.CourseId=courseid,
                    name.CourseType=coursetype,
                    name.Description=description,
                    name.Price=price
                    console.log(name);

                    await name.save()
                    res.status(400).send(" coursename")


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


addcourse.patch('/edit',auth,admincheck,async(req,res)=>{
    try{

            const {coursename,coursetype,price}=req.body;
            const old=await sample1.findOne({CourseName:coursename})
            if(old){
                old.CourseName=coursename,
                old.CourseType=coursetype,
                old.Price=price
                await old.save()
                console.log(old);
                res.status(400).send("coursename edited")
                console.log(" coursename edited")

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

addcourse.delete('/delete',auth,admincheck,async(req,res)=>{
    try{
        const courname=req.query.coursename
        console.log(courname)
        const name= await sample1.findOneAndDelete({CourseName:courname}) 
        if(name){
            res.status(200).send(name)
            console.log(name);
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

addcourse.get('/logout',(req,res)=>{
    res.clearCookie('cookietoken');
    res.status(200).send("logout")
    console.log("logout");
    
})

export{addcourse}











// import { Router } from "express";
// import {auth} from '../Middleware/auth.js';
// import { admincheck } from "../Middleware/admincheck.js";
// const addcourse=Router();
// let course=new Map()
// addcourse.post('/addcourse',auth,admincheck,(req,res)=>{
//     //console.log(req.username);
//     try{
//         //if(req.userrole=='admin'){
//             const {coursename,coursetype,courseid,description,price}=req.body;
//             if(course.get(coursename)){
//             res.status(400).send("coursename already there bro")
//             console.log("already there bro")
//             }
//             else{
//                 course.set(coursename,{coursename,coursetype,courseid,description,price});
//                 res.status(200).send(course.get(coursename));
//                 console.log(course.get(coursename));
//             }
//         }
//     //     else{
//     //         res.status(400).send("not authorized")
//     //         console.log("not authorized")
//     //     }
//     // }
//     catch{
//         console.log("error")
//     }

// })

// // addcourse.get('/getcourse/:coursename',(req,res)=>{
// //     const name=req.params.coursename
// //     console.log(name);
    
// // })

// addcourse.get('/getcourse',(req,res)=>{
//     const namee=req.query.Coursename
//     console.log(namee)
//     const cname=course.get(namee)
//     if(cname){
//         res.status(200).send(cname)
//         console.log(cname);
//     }
//     else{
//         res.status(404).send("error")
//         console.log("error");
//     }

// })

// addcourse.put('/update',auth,admincheck,(req,res)=>{
//     try{
//         //if(req.userrole=='admin'){
//             const {coursename,coursetype,courseid,description,price}=req.body;
//             if(course.get(coursename)){
//                 course.set(coursename,{coursename,coursetype,courseid,description,price});
//                 res.status(200).send(course.get(coursename));
//                 console.log(course.get(coursename));
//             }
//             else{
//                 res.status(400).send("add coursename")
//             console.log("add coursename")
//             }
//         // }
//         // else{
//         //     res.status(400).send("not authorized")
//         //     console.log("not authorized")
//         // }
//     }
//     catch{
//         console.log("error")
//     }


// })


// addcourse.patch('/edit',auth,admincheck,(req,res)=>{
//     try{

//             const {coursename,coursetype,price}=req.body;
//             const old=course.get(coursename)
//             if(course.get(coursename)){
//                 course.set(coursename,{coursename,coursetype,courseid:old.courseid,description:old.description,price});
//                 res.status(200).send(course.get(coursename));
//                 console.log(course.get(coursename));
//             }
//             else{
//                 res.status(400).send("add coursename")
//             console.log("add coursename")
//             }
//     }
//     catch{
//         console.log("error")
//     }

// })

// addcourse.delete('/delete',auth,admincheck,(req,res)=>{
//     try{
//         console.log(course)
//         const courname=req.query.Coursename
//         console.log(courname)
//         if(course.get(courname)){
//             course.delete(courname)
//             res.status(200).send("deleted")
//             console.log(course)
            
//         }
//         else{
//             res.status(400).send("add name")
//         }
//     }
//     catch{
//         res.status(200).send("Error")

//     }
// })

// addcourse.get('/logout',(req,res)=>{
//     res.clearCookie('cookietoken');
//     res.status(200).send("logout")
//     console.log("logout");
    
// })

// export{addcourse}