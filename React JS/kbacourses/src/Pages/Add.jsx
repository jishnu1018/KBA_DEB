import React from 'react'
import Nav from './Nav'

const Add = () => {
  return (
    <>
    <Nav/>
    <div class="h-[800px] w-[700px] bg-blue-200 mt-6 ml-[550px] rounded-lg shadow-lg shadow-slate-400">
        <p class="text-3xl font-bold text-stone-700 flex justify-center pt-8">Add Course</p>
        
        <div class="ml-16 mt-8" >
            <p class="font-bold">Course Name</p>
            <input type="text" placeholder="eg. Certified Blockchain Associate" class="w-[550px] h-8 mt-2 text-md pl-2 text-sm rounded bg-white" />
            <p class="font-bold mt-6">Course Id</p>
            <input type="text" placeholder="eg. 1" class="w-[550px] h-8 mt-2 text-md pl-2 text-sm rounded bg-white" />
            <p class="font-bold mt-6">Course Type</p>
            <select name="" id="" class="w-[550px] h-8 mt-2 pl-2 text-sm rounded bg-white">
                <option value="">Self-Paced</option>
                <option value="">Paced</option>
                <option value="">Non-Paced</option>
            </select>
            <p class="font-bold mt-6">Description</p>
            <textarea name="" id="" placeholder="Small description on the course" class="w-[550px] h-[120px] mt-2  pt-2 pl-2 text-sm rounded bg-white"></textarea>
            <p class="font-bold mt-6">Price</p>
            <select name="" id="" class="w-[550px] h-8 mt-2 pl-2 text-sm rounded bg-white">
                <option value="">Rs.5000</option>
                <option value="">Rs.2500</option>
                <option value="">Rs.1500</option>
            </select>
        </div>
        <a href="updatecourse.html"><button class="bg-blue-900 text-white mt-16 mb-10 ml-[60px] w-[550px] h-8 rounded-2xl hover:bg-white hover:text-blue-900 font-extrabold">
        Add Course
        </button></a>
    </div>
    </>
  )
}

export default Add