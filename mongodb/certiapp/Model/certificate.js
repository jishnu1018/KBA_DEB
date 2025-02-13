
import { Schema } from "mongoose";
import { model } from "mongoose";


    
const demo = new Schema({
    Course:{type:String,required:true},
    Id:{type:String,required:true},
    Name:{type:String,required:true},
    Grade:{type:String,required:true},
    Date:{type:String,required:true}
}) 
const certi=model('Certificate',demo)

export {certi}