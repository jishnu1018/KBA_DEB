import React, { useState, useEffect } from "react";
import { logo, search } from "../assets/Images/Images";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState({ name: "User" });
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [products, setProducts] = useState([]); // State to store search results

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const email = localStorage.getItem("userEmail");

        if (!email) return; // Exit if no email is found

        const response = await axios.get(`http://localhost:9001/user/${email}`);

        if (response.data) {
          setUser({
            name: response.data.name, // Ensure this matches the DB field
            image: response.data.image || "/default-avatar.jpg",
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to fetch products based on search query
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:9001/products?search=${searchQuery}`);
      setProducts(response.data); // Update state with search results
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="bg-black w-full h-auto md:h-24 flex flex-col md:flex-row items-center px-4 py-2">
      <div className="flex justify-between w-full md:w-auto">
        <a href="/home.html">
          <img src={logo} alt="logo" className="border border-black rounded-full w-24 h-16" />
        </a>
        <h1 className="text-white text-2xl italic font-serif ml-4 mt-4 md:ml-2">R8TIFY.com</h1>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-3xl md:hidden ml-auto">
          ☰
        </button>
      </div>

      <div className={`${menuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row w-full md:w-auto items-center mt-4 md:mt-0`}>
        <div className="flex flex-col md:flex-row md:ml-96 w-full md:w-auto items-center">
          <div className="flex w-full md:w-auto">
            <input
              type="text"
              placeholder="Search"
              className="h-10 w-full md:w-[400px] rounded-l-full pl-4 text-lg bg-white"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button
              className="h-10 w-12 bg-white border-2 border-gray-300 rounded-r-full flex items-center justify-center"
              onClick={handleSearch}
            >
              <img src={search} alt="Search" className="h-6 w-6" />
            </button>
          </div>
          <Link to="/categories" className="text-lg font-bold rounded px-4 h-10 py-1 bg-white mt-2 md:mt-0 md:ml-24">
            Categories
          </Link>
          <a href="#Trending Insights" className="text-lg font-bold rounded px-4 h-10 py-1 bg-white mt-2 md:mt-0 md:ml-24">
            Trending Insights
          </a>
        </div>
        <div className="flex flex-col md:flex-row items-center mt-4 ml-4 md:mt-0">
          <Link to="/profile"><h4 className="text-white">{user.name}</h4></Link>
          <div className="bg-gray-400 w-12 h-12 rounded-full ml-4">
            <Link to="/profile">
              <img src={user.image || "/Image/default-avatar.jpg"} alt="Profile" className="rounded-full w-12 h-12" />
            </Link>
          </div>
        </div>
      </div>

      {/* Search Results Dropdown */}
      {products.length > 0 && (
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg w-[400px] max-h-60 overflow-y-auto mt-2">
          {products.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id} className="block px-4 py-2 border-b hover:bg-gray-100">
              {product.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default LoginNavbar;








// import React, { useState, useEffect } from "react";
// import { logo, search } from "../assets/Images/Images";
// import axios from "axios";
// import { Link} from "react-router-dom";

// const LoginNavbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [user, setUser] = useState({ name: "User"});

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const email = localStorage.getItem("userEmail");
//         console.log(localStorage.getItem("userEmail"));

//         if (!email) return; // Exit if no email is found
  
//         const response = await axios.get(`http://localhost:9001/user/${email}`);
        
//         if (response.data) {
//           setUser({
//             name: response.data.name, // Ensure this matches the DB field
//             image: response.data.image || "/default-avatar.jpg",
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };
  
//     fetchUser();
//   }, []);
  

//   return (
//     <div className="bg-black w-full h-auto md:h-24 flex flex-col md:flex-row items-center px-4 py-2">
//       <div className="flex justify-between w-full md:w-auto">
//         <a href="/home.html">
//           <img src={logo} alt="logo" className="border border-black rounded-full w-24 h-16" />
//         </a>
//         <h1 className="text-white text-2xl italic font-serif ml-4 mt-4 md:ml-2">R8TIFY.com</h1>
//         <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-3xl md:hidden ml-auto">
//           ☰
//         </button>
//       </div>

//       <div className={`${menuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row w-full md:w-auto items-center mt-4 md:mt-0`}>
//         <div className="flex flex-col md:flex-row md:ml-96 w-full md:w-auto items-center">
//           <div className="flex w-full md:w-auto">
//             <input type="text" placeholder="Search" className="h-10 w-full md:w-[400px] rounded-l-full pl-4 text-lg bg-white" />
//             <button className="h-10 w-12 bg-white border-2 border-gray-300 rounded-r-full flex items-center justify-center">
//               <img src={search} alt="Search" className="h-6 w-6" />
//             </button>
//           </div>
//           <Link to="/categories" className="text-lg font-bold rounded px-4 h-10 py-1 bg-white mt-2 md:mt-0 md:ml-24">Categories</Link>
//           <a href="#Trending Insights" className="text-lg font-bold rounded px-4 h-10 py-1 bg-white mt-2 md:mt-0 md:ml-24">Trending Insights</a>
//         </div>
//         <div className="flex flex-col md:flex-row items-center mt-4 ml-4 md:mt-0">
//           <Link to="/profile"><h4 className="text-white">{user.name}</h4></Link>
//           <div className="bg-gray-400 w-12 h-12 rounded-full ml-4">
//             <Link to="/profile">
//               <img src={user.image || "/Image/default-avatar.jpg"} alt="Profile" className="rounded-full w-12 h-12" />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginNavbar;
