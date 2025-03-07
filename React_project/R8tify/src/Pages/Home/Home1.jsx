import React from 'react'
import Navbar from '../../components/Navbar'
import { homeimg } from '../../assets/Images/Images'
import Footerr from '../../components/Footerr'
import Four from '../../components/Four'
import { Link } from 'react-router-dom'

const Home1 = () => {
  return (
    <>
    <Navbar/>
    <div class="text-center mt-8">
      <img src={homeimg} alt="image" class="mx-auto"/>
      <h1 class="text-5xl mt-4">Reviews that matter, choices that count.</h1>
      <button class="bg-black text-white text-xl font-bold w-80 h-14 mt-4 rounded-full">
          <Link to="/addreview">Write a Review</Link>
      </button>
    </div>
    <div class="text-center mt-12 ">
        <p class="text-2xl">Popular Categories</p>
        <p class="text-lg">Browse our most popular categories</p>
    </div>
    <Four/>
    <Footerr/>
    
    </>
  )
}

export default Home1