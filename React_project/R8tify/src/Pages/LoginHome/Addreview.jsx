import React, { useState } from 'react';
import Footerr from '../../components/Footerr';

const Addreview = () => {
  const [rating, setRating] = useState(0);
  const [TITLE, setTitle] = useState('');
  const [ABOUT, setAbout] = useState('');
  const [IMAGES, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRating = (value) => {
    setRating(value);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check
    if (!TITLE || !ABOUT || rating === 0) {
      alert("Please fill all required fields and select a rating.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("star", rating);
      formData.append("title", TITLE);
      formData.append("about", ABOUT);

      IMAGES.forEach((image, index) => {
        formData.append(`reviewimage${index + 1}`, image);
      });

      const res = await fetch("/api/review", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Error adding review");
      }

      alert("Review added successfully!");

      // Reset form
      setRating(0);
      setTitle('');
      setAbout('');
      setImages([]);
    } catch (error) {
      console.error(error);
      alert("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="w-full max-w-3xl mx-auto border border-black p-6 mt-10 bg-gray-100 rounded-lg">
          <p className="text-3xl text-center">What is your review about?</p>
          <div className="w-full flex items-center border border-black mt-4 p-4 bg-white rounded-lg">
            <img className="h-44 w-44 object-cover rounded-md" src="/Image/Apple iPhone 14 Pro.jpeg" alt="Apple iPhone 14 Pro" />
            <p className="text-3xl font-bold ml-6">Apple iPhone 14 Pro</p>
          </div>

          <p className="text-2xl mt-4">Rate the performance</p>
          <div id="starRating" className="flex space-x-1 text-gray-300">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => handleRating(value)}
                className={`text-5xl cursor-pointer ${value <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
              >
                &#9733;
              </button>
            ))}
          </div>

          <p className="text-2xl mt-4">Write your experience</p>
          <input
            className="w-full h-12 border-2 border-gray-300 rounded-xl pl-4 mt-2"
            type="text"
            value={TITLE}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            placeholder="Give a Title"
          />
          <textarea
            className="w-full h-40 border-2 border-gray-300 rounded-xl pl-4 pt-3 mt-3"
            name="about"
            value={ABOUT}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Write about experience or Performance"
          ></textarea>

          <p className="text-2xl mt-4">Attach files</p>
          <div className="w-full h-36 border border-black mt-3 bg-white rounded-lg flex justify-center items-center cursor-pointer">
            <input
              type="file"
              id="file-input"
              name="reviewImages"
              onChange={handleImageChange}
              accept="image/*"
              multiple
              className="hidden"
            />
            <label htmlFor="file-input" className="flex flex-col items-center">
              <img src="/Image/Add Image free icons designed by nawicon.jpeg" alt="Upload" className="w-16 h-16" />
              <span className="text-2xl">Attach here</span>
            </label>
          </div>

          {/* Image Preview Section */}
          <div className="flex flex-wrap mt-4">
            {IMAGES.map((image, index) => (
              <img key={index} src={URL.createObjectURL(image)} alt="Preview" className="w-24 h-24 object-cover m-2 rounded-md" />
            ))}
          </div>

          <div className="w-full max-w-3xl mx-auto flex justify-center mt-6">
            <button
              type="submit"
              className="bg-black text-white text-xl font-bold w-80 h-14 rounded-full flex items-center justify-center"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </div>
      </form>
      <Footerr />
    </>
  );
};

export default Addreview;
