import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: { type: String,required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirm: { type: String }, // Ideally, don't store this. Use it for validation only.

    //namee: { type: String, default: "" }, // Added in Profile Edit
    phn_no: { type: String, default: "" },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    
    isProfileComplete: { type: Boolean, default: false } // Track profile completion
}, {
    timestamps: true
});

const USER = model("User", UserSchema);

export { USER };










// import { Schema } from "mongoose";
// import { model } from "mongoose";



// const profile = new Schema({
//     name:{type:String,required:true},
//     phn_no:{type:String,required:true},
//     description:{type:String,required:true},
//     image:{type:String}
// },
// {
//     timestamps:true
// })
// const PROFILE=model('PROFILE',profile)

// export {PROFILE}