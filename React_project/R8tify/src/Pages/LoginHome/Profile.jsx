import React, { useEffect, useState } from 'react';
import { logo } from '../../assets/Images/Images';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '', phone: '', image: '' });
  const navigate = useNavigate(); // ✅ Initialize navigate function

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:9001/user-profile", { withCredentials: true });

        if (response.data) {
          console.log("Fetched User Data:", response.data);

          // ✅ Save data to localStorage
          localStorage.setItem("user", JSON.stringify(response.data));

          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);

        // ✅ Use localStorage as fallback
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      }
    };

    fetchUser();
  }, []);

  // ✅ Logout function
  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:9001/logout", { withCredentials: true });

      if (response.status === 200) {
        console.log("Logout successful");

        // ✅ Clear only authentication, keep user data
        localStorage.removeItem("authToken");

        navigate("/login"); // Redirect to login page after logout
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="text-gray-800">
      {/* Logo */}
      <Link to="/home">
        <img src={logo} alt="logo" className="border border-black rounded-full w-24 h-20 mt-2" />
      </Link>

      {/* Header */}
      <div className="flex flex-col items-center text-center p-4">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[100px] xl:text-[120px] italic font-serif text-black drop-shadow-[0_0_3px_cyan] mx-auto mt-[-70px]">
          R8TIFY
        </h1>
      </div>

      {/* Profile Section */}
      <div className="bg-black w-[90%] sm:w-[550px] mx-auto mt-8 p-6 rounded-3xl">
        <p className="text-white text-3xl text-center">Profile</p>
        <div className="text-white flex flex-col sm:flex-row items-center mt-4">
          <img 
            src={user.image ? user.image : "/default-avatar.jpg"} 
            alt="User Profile" 
            className="w-20 rounded-full border-2" 
          />
          <div className="text-lg mt-4 sm:mt-0 sm:ml-10">
            <p>{user.name || "User Name"}</p>
            <p>{user.email || "No Email Found"}</p>
            <p>{user.phone || ""}</p>
          </div>
        </div>
        <div className="flex justify-center sm:justify-end space-x-6 mt-6">
          <Link to="/editprofile" className="bg-blue-500 text-white font-bold px-6 py-2 rounded">
            Edit
          </Link>
          <button
            onClick={handleLogout} // ✅ Attach function to button
            className="bg-red-500 text-white font-bold px-6 py-2 rounded cursor-pointer">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
