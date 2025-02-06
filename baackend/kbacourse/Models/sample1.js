import { Schema } from "mongoose";
import { model } from "mongoose";
    
const course = new Schema({
    CourseName:{type:String,required:true,unique:true},
    CourseType:{type:String},
    CourseId:{type:String,required:true},
    Description:{type:String},
    Price:{type:String,required:true},
    Image:{type:String}


}) 
const sample1=model('coursedetails',course)

export {sample1}