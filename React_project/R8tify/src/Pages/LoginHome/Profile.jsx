import React, { useEffect, useState } from 'react';
import { logo } from '../../assets/Images/Images';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '', phone: '', image: '' });
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:9001/user-profile", {
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error("Failed to fetch user");

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchUserReviews = async () => {
      try {
        const response = await fetch("http://localhost:9001/userreviews", {
          credentials: "include",
        });

        const data = await response.json();
        console.log("Fetched Reviews:", data);
        setReviews(data);
      } catch (error) {
        console.error("Error fetching user reviews:", error);
      }
    };

    fetchUser();
    fetchUserReviews();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:9001/logout", {
        credentials: "include",
      });

      if (!response.ok) throw new Error("Logout failed");

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this review?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:9001/reviews/${reviewId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to delete review");

      setReviews(reviews.filter((review) => review._id !== reviewId));
      alert("Review deleted successfully!");
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className="text-gray-800">
      <Link to="/home">
        <img src={logo} alt="logo" className="border border-black rounded-full w-24 h-20 mt-2" />
      </Link>

      <div className="flex flex-col items-center text-center p-4">
        <h1 className="text-5xl italic font-serif text-black drop-shadow-[0_0_3px_cyan]">
          R8TIFY
        </h1>
      </div>

      {/* Profile Card */}
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
            onClick={handleLogout}
            className="bg-red-500 text-white font-bold px-6 py-2 rounded cursor-pointer">
            Logout
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-gray-100 w-[90%] sm:w-[1000px] mx-auto mt-8 p-6 rounded-3xl">
        <p className="text-black text-3xl text-center font-bold">My Reviews</p>

        {reviews.length > 0 ? (
          <div className="flex flex-col gap-6 mt-4">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row items-start gap-4">
                
                {/* User Info */}
                <div className="flex flex-col items-center">
                  <img src={user.image || "/default-avatar.jpg"} alt="User" className="w-12 h-12 rounded-full border" />
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-gray-500 text-sm">⭐ {review.star} Rating</p>
                </div>

                {/* Review Details */}
                <div className="flex-1">
                  <p className="text-red-600 font-bold text-lg">{review.title}</p>
                  <p className="text-gray-700 font-semibold">{review.about}</p>
                  <p className="text-sm text-gray-500 mt-1">{review.description}</p>
                  <div className="flex space-x-2 mt-2">
                    {review.image && <img src={review.image} alt="Review" className="w-60 h-40 rounded-lg border" />}
                    {review.image2 && <img src={review.image2} alt="Review 2" className="w-24 h-24 rounded-lg border" />}
                  </div>
                </div>

                {/* Edit & Delete Buttons */}
                <div className="flex flex-col space-y-2">
                <Link to={`/editreview/${review._id}`} className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                  Edit
                </Link>

                  <button
                    onClick={() => handleDeleteReview(review._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-4">No reviews added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
