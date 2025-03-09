import { Router } from "express";
import { adminauthen } from "../Middleware/adminauthen.js";
import { PROduct } from "../Model/Admin/add.js";
import { USER } from "../Model/profile.js";
import { Review } from "../Model/sample1.js";
import { adminCheck } from "../Middleware/admincheck.js";
import { upload } from "../Middleware/Multer.js";
import mongoose from "mongoose";

const adminadd = Router();

// ✅ Convert Image to Base64
const convertToBase64 = (buffer) => buffer.toString("base64");

// ✅ Add a Product
adminadd.post(
    "/productadd",
    adminauthen,
    adminCheck,
    upload.fields([
      { name: "productimage1", maxCount: 1 },
      { name: "productimage2", maxCount: 1 },
    ]),
    async (req, res) => {
      try {
        const { Product, Description, Price, Category } = req.body;
  
        if (!Product || !Description || !Price || !Category) {
          return res.status(400).json({ message: "All fields are required" });
        }
  
        const existingProduct = await PROduct.findOne({ Product_name: Product });
  
        if (existingProduct) {
          return res.status(400).json({ message: "Product already exists" });
        }
  
        let proimage1 = null;
        let proimage2 = null;
  
        if (req.files?.productimage1) {
          proimage1 = req.files.productimage1[0].buffer.toString("base64");
        }
        if (req.files?.productimage2) {
          proimage2 = req.files.productimage2[0].buffer.toString("base64");
        }
  
        const newProduct = new PROduct({
          Product_name: Product,
          Product_description: Description,
          price: parseFloat(Price),
          category: Category,
          image: proimage1,
          image2: proimage2,
        });
  
        await newProduct.save();
        res.status(201).json({ message: "Product added successfully", product: newProduct });
      } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  );
  

// ✅ Update Product
adminadd.put(
    "/adminproducts/:id",

    upload.fields([
      { name: "productimage1", maxCount: 1 },
      { name: "productimage2", maxCount: 1 },
    ]),
    async (req, res) => {
      try {
        const { Product_name, Description, Price, Category } = req.body;
  
        let updatedFields = {
          Product_name,
          Product_description: Description,
          price: parseFloat(Price),
          category: Category,
        };
  
        if (req.files?.productimage1) {
          updatedFields.image = req.files.productimage1[0].buffer.toString("base64");
        }
        if (req.files?.productimage2) {
          updatedFields.image2 = req.files.productimage2[0].buffer.toString("base64");
        }
  
        await PROduct.findByIdAndUpdate(req.params.id, updatedFields);
        res.json({ message: "Product updated successfully" });
      } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  );
  


adminadd.get("/categories", async (req, res) => {
    try {
        const categories = ["Phones", "Laptops", "Consoles", "Cameras"]; // Fixed categories from schema
        res.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// ✅ Get All Products
adminadd.get("/adminproducts", async (req, res) => {
    try {
        const { category } = req.query;
        const query = category ? { category } : {};

        const products = await PROduct.find(query);
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ✅ Get Single Product
adminadd.get("/adminproducts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const product = await PROduct.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ✅ Delete Product
adminadd.delete("/adminproducts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const deletedProduct = await PROduct.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ✅ Get All Users
adminadd.get("/adminusers", async (req, res) => {
    try {
        const users = await USER.find({}, "name email createdAt");
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ✅ Delete User
adminadd.delete("/userdelete/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const deletedUser = await USER.findOneAndDelete({ email });

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ✅ Delete Review
adminadd.delete("/reviewdelete", adminauthen, adminCheck, async (req, res) => {
    try {
        const { rname } = req.query;
        const deletedReview = await Review.findOneAndDelete({ name: rname });

        if (!deletedReview) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ✅ Get User Stats
adminadd.get("/userstats", async (req, res) => {
    try {
        const totalUsers = await USER.countDocuments();
        const totalProducts = await PROduct.countDocuments();

        res.json({ totalUsers, totalProducts });
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ✅ Get Recent Users
adminadd.get("/recentusers", async (req, res) => {
    try {
        const users = await USER.find({}, "name email createdAt")
            .sort({ createdAt: -1 })
            .limit(5);

        res.json(users);
    } catch (error) {
        console.error("Error fetching recent users:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ✅ Logout Admin
adminadd.get("/adminlogout", (req, res) => {
    res.clearCookie("cookietoken");
    res.status(200).json({ message: "Admin logged out" });
});

export { adminadd };
