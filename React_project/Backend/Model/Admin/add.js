import { Schema, model } from "mongoose";

const productt = new Schema(
  {
    Product_name: { type: String, required: true },
    Product_description: { type: String, required: true },
    price: { type: Number, required: true }, // Changed from String to Number
    image: { type: String }, // Optional Image URL
    image2: { type: String }, // Optional Second Image URL
  },
  {
    timestamps: true,
  }
);

const PROduct = model("Product", productt);

export { PROduct };
