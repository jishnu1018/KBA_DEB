import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Adminadd = () => {
    const [product,setProduct] = useState('')
    const [description,setDescription] = useState('')
    const [price,serPrice] = useState('')
    const [error, setError] = useState('')

    const navigate= useNavigate();

    const handleAdd= async (e)=>{
        e.preventDefault();
        try{

        }
        catch{
            
        }
    }







  return (
     <div class="w-[1250px] mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold text-center mb-6">Add New Product</h2>


    <form onSubmit={handleAdd} >

      <div>
        <label class=" text-sm font-medium text-gray-700">Product Name</label>
        <input type="text"  required class="mt-1 p-3  w-full border border-gray-300 rounded-md "/>
      </div>


      <div>
        <label class=" text-sm font-medium text-gray-700">Product Description</label>
        <textarea   required  class="mt-1 p-3  h-32 w-full border border-gray-300 rounded-md "></textarea>
      </div>


      <div>
        <label  class=" text-sm font-medium text-gray-700">Price</label>
        <input type="number"   class="mt-1 p-3  w-full border border-gray-300 rounded-md "/>
      </div>


      <div>
        <label  class=" text-sm font-medium text-gray-700">Product Image</label>
        <input type="file"   accept="image/*" class="  w-full border border-gray-300 rounded-md mt-1 p-3"/>
      </div>

      <div class="flex justify-center">
        <button type="submit" class=" bg-blue-500 text-white font-semibold w-40 h-12 rounded-md "><a href="admin.html">Add Product</a></button>
      </div>
    </form>


  </div>

  )
}

export default Adminadd