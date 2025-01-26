import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


//import {auth} from '../Middleware/auth.js';


dotenv.config();


const userauth=Router();
let user= new Map();
//let course=new Map()
//get
userauth.get('/',(req,res)=>{
    console.log("hi")
    res.send("hellloooo")
})


//post
userauth.post('/signin',async(req,res)=>{
    try
    {//console.log(req.body);
    //const data=req.body;
    //console.log(data.id);
    //user.set(data.Id,{Username:data.Username,Password:data.Password,Role:data.Role,Condition:data.Condition})
    const {UserName,Password,Role,Condition}=req.body;
    //console.log(Id);
//    const newpassword =await bcrypt.hash(Password,10);

   //console.log(newpassword);
    if(user.get(UserName)){
        res.status(400).send("already there bro")
        console.log("already there bro")
    }
    else{
        const newpassword =await bcrypt.hash(Password,10);
        user.set(UserName,{UserName,newpassword,Role,Condition});
        res.status(200).send(user.get(UserName));
        console.log(user.get(UserName));
    }
   //user.set(Id,{Username,newpassword,Role,Condition});
   //console.log(user.get(Id));

}
catch{
    res.status(500).send("internal server Error")
}
// finally{

// }

});

userauth.post('/login',async(req,res)=>{
    try{
        const {UserName,Password}=req.body;
        const result = user.get(UserName);
        console.log(result);
        
        if(!result){
            res.status(400).send("Enter a valid username");
        }
        else{
            console.log(result.newpassword);
            const valid =await bcrypt.compare(Password,result.newpassword);
            console.log(valid);
            if(valid){
                const token = jwt.sign({UserName:UserName,UserRole:result.Role},process.env.SECRET_KEY);
                console.log(token);
                res.cookie('cookietoken',token,{
                    httpOnly:true
                })
                
                res.status(200).json({message:"Logged in successfully"});
            }
            else{
                
                res.status(401).send("Unauthorized access");

            }
         }

    }
    // catch (error) {
    //     console.error("Error during login:", error); // Log the error details
    //     res.status(500).send("Internal Server Error");
    // }
    
    catch{
        res.status(500).send("Internal Server Error")
    }
})

// userauth.post('/addcourse',auth,(req,res)=>{
//     //console.log(req.username);
//     try{
//         if(req.userrole=='CentreMid'){
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
//         else{
//             res.status(400).send("not authorized")
//             console.log("not authorized")
//         }
//     }
//     catch{

//     }

// })
export  {userauth,user};