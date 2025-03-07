import React from 'react'
import { homeimg } from '../../assets/Images/Images'
import Footerr from '../../components/Footerr'
import Four from '../../components/Four'
import { Link } from 'react-router-dom'
import LoginNavbar from '../../components/LoginNavbar'

const Home = () => {
  return (
    <>
    <LoginNavbar/>
    <div className="text-center mt-8">
      <img src={homeimg} alt="image" className="mx-auto"/>
      <h1 className="text-5xl mt-4">Reviews that matter, choices that count.</h1>
      <button className="bg-black text-white text-xl font-bold w-80 h-14 mt-4 rounded-full">
          <Link to="/addreview">Write a Review</Link>
      </button>
    </div>
    <div className="text-center mt-12 ">
        <p className="text-2xl">Popular Categories</p>
        <p className="text-lg">Browse our most popular categories</p>
    </div>
    <Four/>
    <Footerr/>
    
    </>
  )
}

export default Home