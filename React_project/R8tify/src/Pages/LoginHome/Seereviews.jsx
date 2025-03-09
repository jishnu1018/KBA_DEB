import React, { useEffect, useState } from "react";

const Seereviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:9001/userreviews");
        if (!response.ok) throw new Error("Failed to fetch reviews");

        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">All Reviews</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="bg-white p-4 shadow-lg rounded-lg">
  {/* User Info */}
  <div className="flex items-center mb-2">
  <img
    src={review.user?.profilephoto || "/default-profile.png"} // ✅ Corrected field
    alt="User"
    className="w-10 h-10 rounded-full mr-3"
  />
  <h3 className="text-lg font-semibold">{review.user?.name || "Anonymous"}</h3>
</div>


  {/* Review Details */}
  <h2 className="text-xl font-semibold">{review.title}</h2>
  <p className="text-gray-700">{review.about}</p>

  {/* Review Images */}
  {review.image && <img src={review.image} alt="Review" className="mt-2 w-full h-auto" />}
  {review.image2 && <img src={review.image2} alt="Review 2" className="mt-2 w-full h-auto" />}

  {/* Delete Button */}
  <button
    onClick={() => handleDelete(review._id)}
    className="bg-red-500 text-white px-4 py-2 rounded mt-4"
  >
    Delete
  </button>
</div>

          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default Seereviews;
