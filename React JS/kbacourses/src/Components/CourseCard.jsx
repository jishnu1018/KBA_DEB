import React from 'react';
import courseImage from '../assets/Images/blockchain.avif'



const CourseCard = ({course}) => {
  return (
    <div class="w-[500px] h- bg-cyan-200 pt-6 mb-4 rounded place-items-center ">
    <div class="place-items-center ">
        <p class="font-bold text-2xl mb-6"> {course.title} </p>
        <img class="rounded" src= {courseImage} alt="img" />
    </div>
    <div class="p-9  place-items-center">
    <p class="font-serif"> {course.description} </p>
       
        <button class="bg-blue-900 text-white rounded w-[110px] h-[40px] mt-3">Learn More</button>
        
    </div>
</div>
  )
}

export default CourseCard