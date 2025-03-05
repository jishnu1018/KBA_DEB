import React, { useState } from 'react'
import {useNavigate,Link} from 'react-router-dom'
import { logo} from '../assets/Images/Images';
import Footerr from '../components/Footerr';


const Login = () => {
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [error, setError] = useState('')
   
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
          let apiUrl = "/api/login"; // Default user login
          if (Email === "ji2003jishnu@gmail.com") {
              apiUrl = "/api/adminlogin"; // Admin login API
          }
  
          const response = await fetch(apiUrl, {
              method: 'POST',
              credentials: 'include',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ EMAIL: Email, PASSWORD: Password }),
          });
  
          if (!response.ok) {
              const errData = await response.json();
              throw new Error(errData.msg || 'Login failed');
          }
  
          const userData = await response.json();
          console.log("User Data:", userData); // Debugging: Log user data
  
          // Redirect based on role
          if (Email === "ji2003jishnu@gmail.com") {
              navigate('/adminhome');
          } else {
              navigate('/home');
          }
      } catch (err) {
          setError(err.message || 'Invalid credentials: Please try again!');
      }
  };
  


    // const handleLogin = async (e) =>{
    //     e.preventDefault();
    //     try{
    //         const response = await fetch('/api/login',{
    //             method:'POST',
    //             credentials: 'include',
    //             headers: {
    //                 'Content-Type':'application/json',
    //             },
    //             body: JSON.stringify({EMAIL:Email,PASSWORD:Password}),
    //         });

    //         if(!response.ok) {
    //             const errData = await response.json();
    //             throw new Error(errData.msg || 'Login failed');
    //         }
    //         if (Email === "ji2003jishnu@gmail.com") {
    //           navigate('/adminhome');
    //       } else {
    //           navigate('/home');
    //       }
    //     } catch(err) {
    //         setError(err.message || 'Invalid credentials: Please try again!')
    //     }
    // };
    return (
        <div className="text-gray-800">
     
        <img src={logo} alt="logo" className="border border-black rounded-full w-24 h-20 mt-2 ml-2" />
      

        <div className="flex flex-col lg:flex-row   items-center lg:items-start">
        <h1 className="text-6xl md:text-[150px] italic font-serif text-black drop-shadow-[0_0_3px_cyan] mt-10 md:mt-20 text-center lg:ml-[350px]">R8TIFY</h1>

        <p className="text-xl md:text-4xl text-center lg:text-left mt-6 md:mt-[354px] lg:ml-[-700px]">
          "Good reviews bring products to life, making them shine and transforming choices into confident
          decisions with trusted insights."
        </p>

        {/* Login Form */}
        <div className="bg-black  md:w-[527px] md:mr-[80px] md:h-[500px] lg:ml-[150px] rounded-[57px] p-8">
        <h1 className="text-white text-4xl md:text-[50px] font-serif text-center">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mt-6">
              <label className="text-white text-lg md:text-xl font-light">Email</label>
              <input
                type="email"
                required
                className="w-full md:w-[400px] h-10 mt-1 ml-4 rounded-lg p-2 bg-white"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-6">
              <label className="text-white text-lg md:text-xl font-light">Password</label>
              <input
                type="password"
                required
                className="w-full md:w-[400px] h-10 mt-1 ml-4 rounded-lg p-2 bg-white"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <button
              type="submit"
              className="w-full md:w-[150px] h-[50px] mt-6 rounded-full border-2 border-black bg-white text-black text-xl font-bold cursor-pointer block mx-auto"
            >
              Login
            </button>
            
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}

            <p className="text-white text-lg text-center mt-2">
            Don't have an account? <Link to="/signup" className="text-blue-500 font-bold">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
      <Footerr/>

    </div>
      )
}

export default Login