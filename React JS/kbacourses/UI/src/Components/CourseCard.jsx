import React, { useState } from 'react';
import courseImage from '../assets/Images/blockchain.avif'



const CourseCard = ({course}) => {

  const [showFullDescription, setShowFullDescription]=useState(false)
  const description =showFullDescription? course.description : course.description.substring(0,80)

  return (
    <div className="w-[500px] h- bg-cyan-200 pt-6 mb-4 rounded place-items-center ">
    <div className="place-items-center ">
        <p className="font-bold text-2xl mb-6"> {course.title} </p>
        <img className="rounded" src= {courseImage} alt="img" />
    </div>
    <div className="p-9  place-items-center">
    <p className="font-serif"> {description}

    <button className=' text-red-500 rounded mt-3' onClick={()=>setShowFullDescription(!showFullDescription)}>
      {showFullDescription?'less':'.....more'}</button> </p>
       
        <button className="bg-blue-900 text-white rounded w-[110px] h-[40px] mt-3">Learn More</button>
        
    </div>
</div>
  )
}

export default CourseCard