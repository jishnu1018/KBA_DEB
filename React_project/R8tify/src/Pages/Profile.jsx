import React, { useState } from 'react';
import { logo } from '../assets/Images/Images';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [phn, setPhn] = useState('');
  const [desc, setDesc] = useState('');
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)); // Show preview of selected image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !phn || !desc) {
      alert("Please fill all fields before submitting.");
      return;
    }
  
    try {
      setLoading(true);
      const formData = new FormData();
  
      if (image) {
        formData.append("updatephoto", image);
      }
  
      // Convert to FormData-compatible format
      formData.append("NAME", name);
      formData.append("PHN", phn);
      formData.append("DESC", desc);
  
      console.log([...formData.entries()]); // Debug before sending
  
      const res = await fetch("/api/profileupdate", {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
  
      if (!res.ok) {
        throw new Error("Error updating profile");
      }
  
      alert("Profile updated successfully!");
      setImage(null);
      setPreview(null);
      setName("");
      setPhn("");
      setDesc("");
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <img src={logo} alt="logo" className="border border-black rounded-full w-24 h-20 mt-2" />

      <div className="flex flex-col items-center text-center p-4">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[100px] xl:text-[120px] italic font-serif text-black drop-shadow-[0_0_3px_cyan] mx-auto mt-[-70px]">
          R8TIFY
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="bg-black w-[527px] h-[600px] rounded-[57px] mt-[-25px] p-8">
          <p className="text-white text-[40px] font-serif mt-[-15px] text-center">Edit Profile</p>

          {/* Profile Image Upload */}
          <div className="relative bg-gray-200 rounded-full w-24 h-24 mx-auto flex items-center justify-center cursor-pointer">
            <input type="file" id="file-input" accept="image/*" onChange={handleImageChange} className="hidden" />
            <label htmlFor="file-input" className="cursor-pointer flex flex-col items-center">
              {preview ? (
                <img src={preview} alt="Profile Preview" className="w-24 h-24 object-cover rounded-full" />
              ) : (
                <span className="text-gray-600 text-sm">Upload Image</span>
              )}
            </label>
          </div>

          {/* Input Fields */}
          <div className="mt-4">
            <label className="text-white text-xl font-light">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-[400px] h-10 mt-1 ml-4 rounded-lg bg-white px-2"
            />
          </div>

          <div className="mt-6">
            <label className="text-white text-xl font-light">Phone:</label>
            <input
              type="number"
              value={phn}
              onChange={(e) => setPhn(e.target.value)}
              required
              className="w-[400px] h-10 mt-1 ml-4 rounded-lg bg-white px-2"
            />
          </div>

          <div className="mt-6">
            <label className="text-white text-xl font-light">Description:</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
              className="w-[400px] h-20 mt-1 ml-4 rounded-lg bg-white px-2 py-1"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-[150px] h-[50px] text-xl mt-6 ml-[160px] rounded-full border-2 border-black bg-white text-black font-bold flex justify-center items-center"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>

      <p className="content text-4xl mt-[50px] text-center">
        "Good reviews bring products to life, making them shine <br /> and transforming choices into confident
        decisions <br /> with trusted insights."
      </p>
    </>
  );
};

export default Profile;




// import React, { useState, useEffect } from 'react';
// import { logo } from '../assets/Images/Images';
// import { useNavigate } from 'react-router-dom';

// const Profile = () => {
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [name, setName] = useState('');
//   const [phn, setPhn] = useState('');
//   const [desc, setDesc] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [profilePhoto, setProfilePhoto] = useState(null);
//   const navigate = useNavigate();

//   // Fetch user data on mount (to show existing profile photo)
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const res = await fetch('/api/getUserProfile', { credentials: 'include' });
//         const data = await res.json();
//         if (res.ok) {
//           setName(data.name || '');
//           setPhn(data.phn_no || '');
//           setDesc(data.description || '');
//           setProfilePhoto(data.profilephoto); // Load existing profile photo
//         }
//       } catch (error) {
//         console.error('Error fetching user profile:', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//     setPreview(URL.createObjectURL(file)); // Show preview of selected image
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!name || !phn || !desc) {
//       alert('Please fill all fields before submitting.');
//       return;
//     }

//     try {
//       setLoading(true);
//       const formData = new FormData();
//       if (image) {
//         formData.append('updatephoto', image);
//       }
//       formData.append('NAME', name);
//       formData.append('PHN', phn);
//       formData.append('DESC', desc);

//       const res = await fetch('/api/profileupdate', {
//         method: 'PUT',
//         credentials: 'include',
//         body: formData,
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error('Error updating profile');
//       }

//       alert('Profile updated successfully!');
//       setProfilePhoto(data.profilephoto); // Update profile photo state
//       setPreview(null); // Clear preview
//       setImage(null);
//       navigate('/home');
//     } catch (error) {
//       console.error(error);
//       alert('Internal Server Error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <img src={logo} alt="logo" className="border border-black rounded-full w-24 h-20 mt-2" />

//       <div className="flex flex-col items-center text-center p-4">
//         <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[100px] xl:text-[120px] italic font-serif text-black drop-shadow-[0_0_3px_cyan] mx-auto mt-[-70px]">
//           R8TIFY
//         </h1>
//       </div>

//       <form onSubmit={handleSubmit} className="flex flex-col items-center">
//         <div className="bg-black w-[527px] h-[600px] rounded-[57px] mt-[-25px] p-8">
//           <p className="text-white text-[40px] font-serif mt-[-15px] text-center">Edit Profile</p>

//           {/* Profile Image Upload */}
//           <div className="relative bg-gray-200 rounded-full w-24 h-24 mx-auto flex items-center justify-center cursor-pointer">
//             <input type="file" id="file-input" accept="image/*" onChange={handleImageChange} className="hidden" />
//             <label htmlFor="file-input" className="cursor-pointer flex flex-col items-center">
//               {preview ? (
//                 <img src={preview} alt="Profile Preview" className="w-24 h-24 object-cover rounded-full" />
//               ) : profilePhoto ? (
//                 <img src={profilePhoto} alt="Profile" className="w-24 h-24 object-cover rounded-full" />
//               ) : (
//                 <span className="text-gray-600 text-sm">Upload Image</span>
//               )}
//             </label>
//           </div>

//           {/* Input Fields */}
//           <div className="mt-4">
//             <label className="text-white text-xl font-light">Name:</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               className="w-[400px] h-10 mt-1 ml-4 rounded-lg bg-white px-2"
//             />
//           </div>

//           <div className="mt-6">
//             <label className="text-white text-xl font-light">Phone:</label>
//             <input
//               type="number"
//               value={phn}
//               onChange={(e) => setPhn(e.target.value)}
//               required
//               className="w-[400px] h-10 mt-1 ml-4 rounded-lg bg-white px-2"
//             />
//           </div>

//           <div className="mt-6">
//             <label className="text-white text-xl font-light">Description:</label>
//             <textarea
//               value={desc}
//               onChange={(e) => setDesc(e.target.value)}
//               required
//               className="w-[400px] h-20 mt-1 ml-4 rounded-lg bg-white px-2 py-1"
//             ></textarea>
//           </div>

//           <button
//             type="submit"
//             className="w-[150px] h-[50px] text-xl mt-6 ml-[160px] rounded-full border-2 border-black bg-white text-black font-bold flex justify-center items-center"
//             disabled={loading}
//           >
//             {loading ? 'Submitting...' : 'Submit'}
//           </button>
//         </div>
//       </form>
//     </>
//   );
// };

// export default Profile;
