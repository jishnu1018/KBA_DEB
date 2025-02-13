import React from 'react'
import Logo from "../assets/Images/Logo.png"

const Nav = () => {
  return (
    <div class="bg-cyan-500 w-[1840px] h-20 ml-1 shadow-lg shadow-slate-400 ">
            <img  alt="Logo" src={Logo} width="50px" class="pl-2 pt-4" />
        <p class="absolute top-10 ml-[1390px] text-lg ">
            <a href="Home.html" class="pr-4 hover:text-white">Home</a>
            <a href="Courses.html" class="pr-4 hover:text-white">Courses</a>
            <a href="Contactus.html" class="pr-4 hover:text-white">Contact Us</a>
            <a href="addcourse.html" class="pr-4 hover:text-white"> Add Course</a>
            <a href="login.html" class="hover:text-white">logout</a>
        </p>
        
    </div>
  )
}

export default Nav