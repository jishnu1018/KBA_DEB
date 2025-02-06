import { Schema } from "mongoose";
import { model } from "mongoose";
    
const demo = new Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,required:true}

}) 
const sample=model('userdetails',demo)

export {sample}