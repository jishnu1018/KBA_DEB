import { Router } from "express";
import { enroll } from "../Models/enroll.js";
import dotenv from "dotenv"
dotenv.config();

const student=Router();

student.post('/addetails',async(req,res)=>{
    try{
        const {Name,Enroll_no,Course,DAte}=req.body
        console.log(Name)
        const previous=await enroll.findOne({enrollment_no:Enroll_no})
        if(previous){
            console.log("Already enrolled");
            res.status(400).send("Alredy enrolled")
        }
        else{
            console.log("hi");

            const details=new enroll({
                student_name:Name,
                enrollment_no:Enroll_no,
                course:Course,
                date:DAte
            })
            await details.save()
            console.log(details);
            res.status(200).send("enrolled Successfully")
        }
    }
    catch(error){
        console.log(error);
    }
})

student.get('/getdetails',async(req,res)=>{
   try
    { const courrse=req.query.coursename
    console.log(courrse);
    const daata=await enroll.find({course:courrse})
    if (daata) {
        console.log(daata);
        res.status(200).send(daata)
        console.log("successfully fetched");
    }   
    else{
        console.log("no details found");
        res.status(400).send("no details found")
    }
    }
catch(error){
    console.log(error);
    
}
})

student.put('/update',async(req,res)=>{
    
    try
    {
        const {Name,Enroll_no,Course,DAte}=req.body
        console.log(Name)
    const DATA=await enroll.findOne({enrollment_no:Enroll_no})
    if(DATA){
       
           DATA.student_name=Name,
           DATA.enrollment_no=Enroll_no,
           DATA.course=Course,
           DATA.date=DAte
     await DATA.save()
        console.log(DATA);
        res.status(200).send("details updated")
    }
    
    else{
        console.log("no details found");
        res.status(400).send("no details found")
    
    }
    }
    
    catch(error){
        console.log(error);
        res.status(200).send(DATA)
    }
})

student.delete('/delete',async(req,res)=>{
   try
    { const enr=req.query.enrol
    console.log(enr);
    const res=await enroll.findOneAndDelete({enrollment_no:enr})
    if(res){
        console.log(res);
        console.log("deleted");

        res.status(200).send("deleted")
        
    }
    else{
        console.log("no details found");
        res.status(400).send("no details found")
    
    }
}
    catch{

    }
})

export{student}