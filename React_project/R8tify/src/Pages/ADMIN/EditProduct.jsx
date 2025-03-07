import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState({ Product_name: "", Description: "", price: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:9001/adminproducts/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product");

        const data = await response.json();
        setProduct({
          Product_name: data.Product_name,
          Description: data.Product_description || "", // Ensure Description is fetched
          price: data.price
        });
        setLoading(false);
      } catch (error) {
        setError("Error fetching product details");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(`http://localhost:9001/adminproducts/${id}`, { // ✅ Correct API URL
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Product_name: product.Product_name,  // Match backend key
                Description: product.Description,
                Price: product.price
            }),
        });

        if (!response.ok) throw new Error("Failed to update product");

        alert("Product updated successfully!");
        navigate("/adminproducts"); // ✅ Fix redirect path
    } catch (error) {
        setError("Error updating product");
    }
};


  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Product Name</label>
            <input
              type="text"
              name="Product_name"
              value={product.Product_name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Description</label>
            <textarea
              name="Description"
              value={product.Description}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Update Product
          </button>
        </form>
        <button
          onClick={() => navigate("/admin-products")}
          className="w-full mt-4 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-700 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditProduct;
