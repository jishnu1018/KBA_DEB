import { Router } from "express";
import { authenticate } from "../Middleware/authenticate.js";
import { Review } from "../Model/sample1.js";
// import { user } from "./userauth.js";
import { PROduct } from "../Model/Admin/add.js";
//import { PROFILE } from "../Model/profile.js";
import { usercheck } from "../Middleware/usercheck.js";
import { upload } from "../Middleware/Multer.js";
import { USER } from "../Model/profile.js";


const review=Router();
const ConvertToBase64=(buffer)=>{
    return buffer.toString("base64");
}

//Adding a review   
review.post(
    "/review",
    authenticate,
    upload.fields([
      { name: "reviewimage1", maxCount: 1 },
      { name: "reviewimage2", maxCount: 1 }
    ]),
    async (req, res) => {
      try {
        const { Name, Star, Title, About } = req.body;
  
        // if (!req.user || !req.user._id) {
        //   return res.status(401).send("Unauthorized: User not found");
        // }
  
        console.log("Review for:", Name);
  
        // Find the product in the database
        const sameproduct = await PROduct.findOne({ Product_name: Name });
  
        if (!sameproduct) {
          console.log("Product not found");
          return res.status(404).send("Product not found");
        }
  
        let imagebase64_1 = null;
        let imagebase64_2 = null;
  
        if (req.files?.reviewimage1) {
          imagebase64_1 = ConvertToBase64(req.files.reviewimage1[0].buffer);
        }
        if (req.files?.reviewimage2) {
          imagebase64_2 = ConvertToBase64(req.files.reviewimage2[0].buffer);
        }
  
        // Save the review with productId and authenticated userId
        const newReview = new Review({
          productId: sameproduct._id,
          //userId: req.user._id, // Using authenticated userId
          star: parseInt(Star, 10), // Convert string to number safely
          title: Title,
          about: About,
          image: imagebase64_1,
          image2: imagebase64_2
        });
  
        await newReview.save();
  
        // Populate userId and productId before sending response
        const populatedReview = await Review.findById(newReview._id)
          .populate("userId", "name image") // Select user name and email
          .populate("productId", "Product_name Product_description price image image2"); // Select product details
  
        console.log("Review added:", populatedReview);
  
        res.status(201).json({
          message: "Review added successfully",
          review: populatedReview
        });
      } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
      }
    }
  );
  





//Update the review
review.put('/reviewupdate', authenticate,async (req, res) => {
    try {
        const { productId, Star, Title, About } = req.body;

        // Find the review based on productId
        const sreview = await Review.findOne({ productId });

        if (!sreview) {
            console.log("Review not found");
            return res.status(404).send("Review not found");
        }

        // Update the existing review
        sreview.star = parseInt(Star); // Ensure it's stored as a number
        sreview.title = Title;
        sreview.about = About;

        await sreview.save(); // Save changes to the database
        console.log("Updated review:", sreview);

        res.status(200).send("Review updated successfully");
    } catch (error) {
        console.error("Error updating review:", error);
        res.status(500).send("Internal Server Error");
    }
});


//Get the Product
review.get("/product", authenticate, async (req, res) => {
  try {
    const productName = req.query.name?.trim(); // Trim whitespace

    if (!productName) {
      return res.status(400).json({ message: "Product name is required" });
    }

    // Find the product (case-insensitive)
    const prod = await PROduct.findOne({ Product_name: { $regex: new RegExp(productName, "i") } });

    if (!prod) {
      console.log("Product not found");
      return res.status(404).json({ message: "Product not found" });
    }

    // Fetch reviews using the product's _id
    const reviews = await Review.find({ productId: prod._id });

    console.log(`Found ${reviews.length} reviews for product: ${productName}`);

    return res.status(200).json(reviews); // Always return 200, even if empty
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});




//Upadte profile

review.get("/getUserProfile", async (req, res) => {
  try {
    const userId = req.user.id; // Assuming authentication middleware sets req.user
    const user = await USER.findById(userId).select("-password"); // Exclude password

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      name: user.name,
      phn_no: user.phn_no,
      description: user.description || "",
      profilephoto: user.profilephoto || "",
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to update user profile
review.put("/profileupdate", upload.single("updatephoto"), async (req, res) => {
  try {
    const { email, NAME, PHN } = req.body;  // Accept email from frontend

    if (!email || !NAME || !PHN) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedUser = await USER.findOneAndUpdate({ email }, {
      name: NAME,
      phn_no: PHN,
      profilephoto: req.file ? `/uploads/${req.file.filename}` : undefined,
    }, { new: true });

    res.json({ message: "Profile updated successfully", profilephoto: updatedUser.profilephoto });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// review.put('/profileupdate', authenticate, upload.single('updatephoto'), async (req, res) => {
//     try {
//         const { NAME, PHN, DESC } = req.body;
//         console.log(NAME);

//         let user = await USER.findOne({ name: NAME });
        
        
//         // if (!user) {
//         //     console.log("User not found");
//         //     return res.status(400).send("User not found");
//         // }

//         // Update fields
//         user.phn_no = PHN;
//         user.description = DESC;
        
//         // Update profile photo if a new one is uploaded
//         if (req.file) {
//             user.profilephoto = req.file.path;
//         } else if (!user.profilephoto) {
//             // Set default photo if none exists
//             user.profilephoto = "default_profile.jpg"; // Replace with your actual default image
//         }

//         await user.save();
//         console.log("Profile updated:", user);
//         res.status(200).send("Profile updated");
//     } catch (err) {
//         console.error("Error:", err);
//         res.status(500).send("Internal server error");
//     }
// });


//logout
review.get('/logout',(req,res)=>{
    res.clearCookie('cookietoken');
    res.status(200).send("logout")
    console.log("logout");
    
})

export {review}





//Add the Profile
// review.post('/profile', authenticate, upload.single("profilephoto"), async (req, res) => {
//     try {
//         const userId = req.user.id; // Get user ID from authentication middleware
//         const {NAME, PHN, DESC } = req.body;

//         console.log("Adding profile for:", NAME);
//         console.log("User ID from authentication:", req.user.id);

//         // Check if the user already has a profile
//         const existingUser = await USER.findById(userId);
//         if (!existingUser) {
//             console.log("User not found");
//             return res.status(404).json({ message: "User not found" });
//         }

//         // if (existingUser.name) {
//         //     console.log("Profile already exists");
//         //     console.log(existingUser.name);
            
//         //     return res.status(400).json({ message: "Profile already exists" });
//         // }

//         let photo = null;
//         if (req.file) {
//             photo = ConvertToBase64(req.file.buffer);
//         }

//         // Update user profile
//         const updatedUser = await USER.findByIdAndUpdate(
//             userId,
//             {
//                 name:NAME,
//                 phn_no: PHN,  // Ensure field name matches schema
//                 description: DESC,
//                 image: photo,
//                 isProfileComplete: true
//             },
//             { new: true } // Return the updated document
//         );

//         console.log("Profile added:", updatedUser);
//         res.status(201).json({ message: "Profile added successfully", user: updatedUser });

//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });




// review.post('/profile',authenticate,upload.single("profilephoto"),async(req,res)=>{
//     try{
//         const {NAME,PHN,DESC}=req.body
//         console.log(NAME);
//         const samename= await PROFILE.findOne({name:NAME}) 
//         if(samename){
//         res.status(400).send("coursename already there bro")
//         console.log("already there bro")
//         }
//         else{
//             let photo=null;
//             if(req.file){
//                 photo=ConvertToBase64(req.file.buffer)
//             }
//             const PROFile =new PROFILE({
//                 name:NAME,
//                 phn_no:PHN,
//                 description:DESC,
//                 image:photo
//             })
//             await PROFile.save();
//             console.log(PROFile);
//             res.status(200).send("Profile added");
//             console.log("Profile added");
            
//         }
//     }
//     catch{
//         res.status(404).send("error")
//                 console.log("error");
//     }
// })



// review.post("/review",authenticate,
//     upload.fields([
//       { name: "reviewimage1", maxCount: 1 },
//       { name: "reviewimage2", maxCount: 1 }
//     ]),
//     async (req, res) => {
//       try {
//         const { Name, Star, Title, About } = req.body;
//         console.log("Review for:", Name);
  
//         // Find the product in the database
//         const sameproduct = await PROduct.findOne({ Product_name: Name });
//         const userr=await PROFILE.findById("67c5a70844134cfe283ba467")
//         if (!sameproduct) {
//           console.log("Product not here");
//           return res.status(404).send("Product not found");
//         }
  
//         let imagebase64_1 = null;
//         let imagebase64_2 = null;
  
//         if (req.files && req.files["reviewimage1"]) {
//           imagebase64_1 = ConvertToBase64(req.files["reviewimage1"][0].buffer);
//         }
//         if (req.files && req.files["reviewimage2"]) {
//           imagebase64_2 = ConvertToBase64(req.files["reviewimage2"][0].buffer);
//         }
  
//         // Save the review with productId
//         const REVIEW = new Review({
            
//           productId: sameproduct._id, // Using ObjectId reference
//           userId:userr._id,
//           star: parseInt(Star), // Ensure it's stored as a number
//           title: Title,
//           about: About,
//           image: imagebase64_1,
//           image2: imagebase64_2
//         });
  
//         await REVIEW.save();
//         console.log(REVIEW);
//         res.status(201).send("Review added successfully");
//         console.log("Review added");
//       } catch (error) {
//         console.error("Error adding review:", error);
//         res.status(500).send("Internal Server Error");
//       }
//     }
//   );
  