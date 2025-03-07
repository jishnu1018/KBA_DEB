import React from 'react'
import Navbar from '../../components/Navbar'
import Products from '../../components/Products'
import Four from '../../components/Four'
import Review from '../../components/Review'
import { Link } from 'react-router-dom'
import Addreview from '../LoginHome/Addreview'

const Categories1 = () => {
  return (
    <>
    <Navbar/>
    <Products/>
    <Four/>
    <div class="text-center mt-12">
        <Link to="/addreview" class="bg-black text-white text-xl font-bold px-8 py-4 rounded-full">Write a Review</Link>
    </div>
    <Review/>
    </>
  )
}

export default Categories1