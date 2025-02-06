
import { Schema } from "mongoose";
import { model } from "mongoose";



const signup = new Schema({
    EMAIL:{type:String,required:true},
    PASSWORD:{type:String,required:true},
    CONFIRM:{type:String,required:true}
})
const sample=model('Signup',signup)

export {sample}