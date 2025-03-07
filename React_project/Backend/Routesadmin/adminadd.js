import { Router } from "express";
import { adminauthen } from "../Middleware/adminauthen.js";
import { PROduct } from "../Model/Admin/add.js";
import { SIGNUP } from "../Model/sample.js";
import { Review } from "../Model/sample1.js";
import { adminCheck } from "../Middleware/admincheck.js";
//import { authenticate } from "../Middleware/authenticate.js";
import { upload } from "../Middleware/Multer.js";
import { USER } from "../Model/profile.js";
import { admin } from "./adminauth.js";
import mongoose from "mongoose";


const adminadd=Router();
const ConvertToBase64=(buffer)=>{
    return buffer.toString("base64");
}

//Add a product
adminadd.post('/productadd',adminauthen,adminCheck,upload.fields
    ([{name:"productimage1",maxCount:1},
        {name:"productimage2",maxCount:1}]),
    async(req,res)=>{
    try{
        const {Product,Description,Price}=req.body
        console.log(Product);
        
        
        const sameproduct= await PROduct.findOne({ Product_name:Product}) 
        if(sameproduct){
        res.status(400).send("Product already there bro")
        console.log("already there bro")
        }
        else{
            let proimage1=null;
            let proimage2=null;
            if(req.files && req.files["productimage1"]){
                proimage1=ConvertToBase64(req.files["productimage1"][0].buffer)
            }
            if(req.files && req.files["productimage2"]){
                proimage2=ConvertToBase64(req.files["productimage2"][0].buffer)
            }
            const pro=new PROduct({
            Product_name:Product,
            Product_description:Description,
            price:Price,
            image:proimage1,
            image2:proimage2
        })  
        await pro.save();
        console.log(pro);
        res.status(200).send("Product added");
        console.log("Product added");
    } 
    }
    catch{
        res.status(404).send("error")
         console.log("error");
    }
})

//Update the Product

adminadd.put('/adminproducts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { Product_name, Description, Price } = req.body;

        // ✅ Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        // ✅ Find and update the product
        const product = await PROduct.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.Product_name = Product_name;
        product.Product_description = Description;
        product.price = Price;

        await product.save();
        return res.status(200).json({ message: "Product updated successfully", product });
    } catch (err) {
        console.error("Error updating product:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// adminadd.put('/productupdate',adminauthen,adminCheck,async(req,res)=>{
//     try{
//         const {Product,Description,Price}=req.body
//         const oneproduct= await PROduct.findOne({ Product_name:Product}) 
//         if(oneproduct){
            
//             oneproduct.Product_description=Description,
//             oneproduct.price=Price
//             console.log(oneproduct);
//             await oneproduct.save()
//             res.status(200).send("updated ")
    
//     }
//     else{
//         res.status(400).send("add coursename")
//     console.log("add coursename")
//     }

//    }
//       catch{
//         console.log("error")
//     }
// })

//Get the product


adminadd.get('/adminproducts/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ Validate if `id` is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const product = await PROduct.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// adminadd.get('/getproduct',adminauthen,adminCheck,async(req,res)=>{
//     const product=req.query.name
//     const prod= await PROduct.findOne({Product_name:product})
//     if(prod){
//         res.status(200).send(prod)
//         console.log(prod);
//     }
//     else{
//         res.status(404).send("error")
//         console.log("error");
//     }
// })


//Delete the Product
adminadd.delete("/adminproducts/:id", async (req, res) => {
    try {
      const productId = req.params.id;
      await PROduct.findByIdAndDelete(productId);
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting product" });
    }
  });
  
// adminadd.delete('/productdelete',adminauthen,adminCheck,async(req,res)=>{
//     try{
//         const productname=req.query.pname
//         console.log(productname);
//         const pName=await PROduct.findOneAndDelete({Product_name:productname})
//         if (pName){
//             res.status(200).send(pName)
//             console.log(pName);
//             console.log("deleted");
//         }
//         else{
//             res.status(400).send("add name")
//         }
//     }
//     catch{
//         res.status(500).send("Error")

//     }
// })

//Get the User
adminadd.get('/userget',adminauthen,adminCheck,async(req,res)=>{
    const Name=req.query.email
    const userr= await USER.findOne({email:Name})
    if(userr){
        res.status(200).send(userr)
        console.log(userr);
    }
    else{
        res.status(404).send("error")
        console.log("error");
    }
})

adminadd.get("/adminproducts", async (req, res) => {
    try {
        const products = await PROduct.find();

        // Convert stored base64 image strings properly
        const formattedProducts = products.map((product) => ({
            ...product.toObject(),
            image: product.image ? `data:image/png;base64,${product.image}` : null,
            image2: product.image2 ? `data:image/png;base64,${product.image2}` : null
        }));

        res.json(formattedProducts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products" });
    }
});


adminadd.get("/adminusers", async (req, res) => {
    try {
      const users = await USER.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users" });
    }
  });

//Delete the User



adminadd.delete('/userdelete/:email', async (req, res) => {
    try {
        const userEmail = req.params.email; // Get email from URL params
        console.log("Deleting user:", userEmail);
        
        const deletedUser = await USER.findOneAndDelete({ email: userEmail });
        
        if (deletedUser) {
            res.status(200).json({ message: "User deleted successfully", user: deletedUser });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting user" });
    }
});

// adminadd.delete('/userdelete',adminauthen,adminCheck,async(req,res)=>{
//     try{
        
        
//         const uusername=req.query.uname
//         console.log(uusername);
        
        
//         const uName=await USER.findOneAndDelete({email:uusername})
//         if (uName){
//             res.status(200).send(uName)
//             console.log(uName);
//             console.log("deleted");
//         }
//         else{
//             res.status(400).send("add name")
//         }
//     }
//     catch{
//         res.status(400).send("Error")

//     }
// })

//Delete the Review
adminadd.delete('/reviewdelete',adminauthen,adminCheck,async(req,res)=>{
    try{
        console.log("buni");
        
        const review=req.query.rname
        console.log(review);
        
        const RName=await Review.findOneAndDelete({name:review})
        if (RName){
            res.status(200).send(RName)
            console.log(RName);
            console.log("deleted");
        }
        else{
            res.status(400).send("add name")
        }
    }
    catch{
        res.status(500).send("Error")

    }
})


adminadd.get("/userstats", async (req, res) => {
    try {
        const totalUsers = await USER.countDocuments();
        const totalProducts = await PROduct.countDocuments();

        res.json({ totalUsers, totalProducts });
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ error: "Failed to fetch statistics" });
    }
});

adminadd.get("/recentusers", async (req, res) => {
    try {
        const users = await USER.find({}, "name email createdAt") // Fetch only required fields
            .sort({ createdAt: -1 }) // Sort by most recent
            .limit(5); // Limit to 5 recent users
        
        res.json(users);
    } catch (error) {
        console.error("Error fetching recent users:", error);
        res.status(500).json({ message: "Error fetching recent users" });
    }
});

//logout
adminadd.get('/adminlogout',(req,res)=>{
    res.clearCookie('cookietoken');
    res.status(200).send("logout")
    console.log("logout");
    
})

export {adminadd}