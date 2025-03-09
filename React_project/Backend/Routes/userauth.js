import { Router } from "express";
//import { SIGNUP } from "../Model/sample.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { USER } from "../Model/profile.js";
import { authenticate } from "../Middleware/authenticate.js";
import { upload } from "../Middleware/Multer.js";





const user = Router();

//signup
user.post('/signup', async (req, res) => {
    try {
        const {NAME, EMAIL, PASSWORD, CONFIRM} = req.body;

        // Check if the email already exists
        const existingUser = await USER.findOne({ EMAIL });
        if (existingUser) {
            console.log("Email already exists");
            return res.status(400).json({ message: "Email already exists" });
        }

        // Check if passwords match
        if (PASSWORD !== CONFIRM) {
            console.log("Passwords do not match");
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(PASSWORD, 10);
        console.log(hashedPassword);

        // Create a new user with only email and password
        const newUser = new USER({
            name:NAME,
            email:EMAIL,
            password: hashedPassword
        });

        await newUser.save();
        console.log("Signup successful");

        res.status(201).json({ message: "Signup successful", user: newUser });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});








// user.post('/signup', async (req, res) => {
//     try {
//         const { EMAIL, PASSWORD, CONFIRM} = req.body;
    

//         const existingUser = await SIGNUP.findOne({ email:EMAIL }); 
           
//         if (existingUser) {
//              res.status(400).json({ message: "Email already exists" });
//              console.log("Email already exists");
             
//         }
//         else{

//             if (PASSWORD !== CONFIRM) {
//                 console.log("Passwords do not match");
//                 res.status(400).json({ message: "Passwords do not match" });
//             }
//             else{
    
//             const newpassword =await bcrypt.hash(PASSWORD,10);
//                 console.log(newpassword);
//                 const newuser=new SIGNUP({
//                     email:EMAIL,
//                     password:newpassword,
                    
//                 })
//                 await newuser.save()
//                 console.log(newuser);
//                 console.log("Signup successfull");
    
//             res.status(201).json({ message: "Signup successfull", user: newuser });
//             }
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });


//login
user.post('/login',async (req,res)=>{
    try{
        const {EMAIL,PASSWORD} = req.body;
        
        const result = await USER.findOne({email:EMAIL})
        console.log(result);
        
        if(!result){
            console.log("Enter a valid username");
            res.status(400).send("Enter a valid username");
        }
        else{
            console.log(result.password);
            const valid=await bcrypt.compare(PASSWORD,result.password)
            console.log(valid);
            if(valid){
                const token= jwt.sign({id: result._id,email:EMAIL},process.env.SECRET_KEY)
                console.log(token);
                res.cookie('cookietoken',token,{
                    httpOnly:true
                })
                console.log("Logged in successfully");
                
                res.status(200).json({message:"Logged in successfully"});
            }
            else{
                
                return res.status(400).json({ msg: "Incorrect password" });

            }
            
        }
    }
    catch{
        res.status(500).send("Internal Server Error")
    }
})







// Route to fetch user details by email
user.get("/user/:email", async (req, res) => {
    try {
      const user = await USER.findOne({ email: req.params.email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        name: user.name,
        phn:user.phn_no, 
        email: user.email,  // ✅ Include the email here
        image: user.image || "/default-avatar.jpg"
      }); 
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Server error" });
    }
});

user.get("/user-profile", authenticate, async (req, res) => {
    try {
        const user = await USER.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            name: user.name,
            email: user.email,
            phone: user.phn_no,
            image: user.image || "", // ✅ Ensure image is included
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Server error" });
    }
});

  
  

user.put("/user-profile", authenticate, upload.single("image"), async (req, res) => {
    try {
        const { name, phone } = req.body;
        let user = await USER.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = name || user.name;
        user.phn_no = phone || user.phn_no;

        // ✅ Store image as Base64
        if (req.file) {
            user.image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        }

        await user.save();
        res.json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Server error" });
    }
});



export { user };


//using map

// import { Router } from "express";
// import dotenv from "dotenv";
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';


// dotenv.config()
// const userauth=Router();

// const user=new Map() 


// userauth.post('/signup', async(req,res)=>{
//     try{
//         const {EMAIL,PASSWORD,CONFIRM}=req.body

//         if(user.get(EMAIL)){
//             console.log("EMAIL already registerd");
//             res.status(400).send("EMAIL already registerd")

            
//         }
//         else{
//             if(PASSWORD===CONFIRM){
//                 const newpassword= await bcrypt.hash(PASSWORD,10)
//                 user.set(EMAIL,{EMAIL,newpassword})
//                 console.log(user.get(EMAIL));
//                 console.log("signed in");
//                 res.status(200).send(user.get(EMAIL));
//             }
//             else{
//                 res.status(200).send("Enter Same Password");
//                 console.log("Enter Same Password");
//             }
//         }
//     }
//     catch{
//         res.status(500).send("internal server Error")

//     }
// });

// userauth.post('/login', async(req,res)=>{
//     try{
//         const {EMAIL,PASSWORD}=req.body
//         const result=user.get(EMAIL)
//         console.log(result);

//         if(!result){
//             res.status(500).send("Enter a valid email or password");
//             console.log("Enter a valid email or password");
//         }
//         else{
//             console.log(result.newpassword);
//             const valid =await bcrypt.compare(PASSWORD,result.newpassword)
//             console.log(valid);
//             if(valid){
//                 const token=jwt.sign({Email:EMAIL},process.env.SECRET_KEY);
//                 console.log(token);
//                 res.cookie('Cookie',token,{
//                     httpOnly:true
//                 })
//                 console.log("Logged in successfully");
//                 res.status(200).json({message:"Logged in successfully"});

//             }
//             else{
//                 res.status(401).send("Unauthorized access");
//             }
            
//         }
//     }
//     catch{
//         res.status(500).send("Internal Server Error")

//     }
// })
// export {userauth}