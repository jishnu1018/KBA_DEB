import React, { useState, useEffect, useRef } from "react";
import { logo, search } from "../assets/Images/Images";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState({ name: "User" });
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        if (!email) return;
        const response = await axios.get(`http://localhost:9001/user/${email}`, {
          withCredentials: true,
        });
        if (response.data) {
          setUser({
            name: response.data.name,
            image: response.data.image || "/default-avatar.jpg",
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  // Fetch products based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setProducts([]);
      setShowDropdown(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        // Extract token from cookies
        const token = document.cookie
          .split("; ")
          .find(row => row.startsWith("cookietoken="))
          ?.split("=")[1];

        if (!token) {
          console.error("No authentication token found!");
          return;
        }

        const response = await axios.get(
          `http://localhost:9001/product?name=${encodeURIComponent(searchQuery)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ Include token
            },
            withCredentials: true,
          }
        );

        setProducts(response.data);
        setShowDropdown(true);
      } catch (error) {
        console.error("Error fetching products:", error.response?.data || error.message);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-black w-full h-auto md:h-24 flex flex-col md:flex-row items-center px-4 py-2 relative">
      <div className="flex justify-between w-full md:w-auto">
        <Link to='/home'>
          <img src={logo} alt="logo" className="border border-black rounded-full w-24 h-16" />
        </Link>
        <h1 className="text-white text-2xl italic font-serif ml-4 mt-4 md:ml-2">R8TIFY.com</h1>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-3xl md:hidden ml-auto">
          ☰
        </button>
      </div>

      <div className={`${menuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row w-full md:w-auto items-center mt-4 md:mt-0`}>
        <div className="flex flex-col md:flex-row md:ml-96 w-full md:w-auto items-center">
          <div className="relative w-full md:w-auto" ref={searchRef}>
            <div className="flex w-full md:w-auto">
              <input
                type="text"
                placeholder="Search"
                className="h-10 w-full md:w-[400px] rounded-l-full pl-4 text-lg bg-white focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="h-10 w-12 bg-white border-2 border-gray-300 rounded-r-full flex items-center justify-center"
                onClick={() => setShowDropdown(true)}
              >
                <img src={search} alt="Search" className="h-6 w-6" />
              </button>
            </div>

            {/* Search Results Dropdown */}
            {showDropdown && products.length > 0 && (
              <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg w-full max-h-60 overflow-y-auto border border-gray-300 z-50">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="block px-4 py-2 border-b hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setShowDropdown(false);
                      navigate(`/category/${product.category}?product=${product._id}`);
                      console.log(`Navigating to /category/${product.category}?product=${product._id}`);
                    }}
                  >
                    {product.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link to="/categories" className="text-lg font-bold rounded px-4 h-10 py-1 bg-white mt-2 md:mt-0 md:ml-24">
            Categories
          </Link>
          <a
  href="#trending"
  onClick={(e) => {
    e.preventDefault();
    document.getElementById("trending")?.scrollIntoView({ behavior: "smooth" });
  }}
  className="text-lg font-bold rounded px-4 h-10 py-1 bg-white mt-2 md:mt-0 md:ml-24"
>
  Trending Insights
</a>

        </div>

        <div className="flex flex-col md:flex-row items-center mt-4 ml-4 md:mt-0">
          <Link to="/profile">
            <h4 className="text-white">{user.name}</h4>
          </Link>
          <div className="bg-gray-400 w-12 h-12 rounded-full ml-4">
            <Link to="/profile">
              <img src={user.image || "/default-avatar.jpg"} alt="Profile" className="rounded-full w-12 h-12" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginNavbar;
