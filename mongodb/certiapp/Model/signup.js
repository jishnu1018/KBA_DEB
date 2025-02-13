
import { Schema } from "mongoose";
import { model } from "mongoose";


    
const demo = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,required:true}

}) 
const signup=model('login',demo)

export {signup}