import React, { useState } from 'react'

const Card = ({title,text,customClasses}) => {
    const[likes,setLikes]=useState(0);
    const [titlecolor,setTitlecolor]=useState('text-black');

    const toggleTitlecolor=()=>{
        setTitlecolor((prevColor)=>
        prevColor==='text-black'? 'text-white':'text-black')
    }
    
  return (
    <div className={`max-w-sm rounded overflow-hidden shadow-lg p-6 mt-4 ml-4 ${customClasses}`}>
        <p className={`font-bold text-xl mb-2 ${titlecolor}`}>{title}</p>
        <p className="text-white ">{text}</p>

        <button
            className='mt-4 py-2 px-2 bg-purple-400 hover:bg-purple-600 rounded' onClick={()=>setLikes(likes+1)} >
                Likes:{likes}
        </button>
        <button
            className='mt-4 ml-4 py-2 px-2 bg-green-400 hover:bg-green-600 rounded' onClick={toggleTitlecolor} >
               Toggle
        </button>
    </div>
  )
}

export default Card