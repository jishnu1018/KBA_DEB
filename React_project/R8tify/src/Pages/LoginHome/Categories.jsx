import React from 'react'
import LoginNavbar from '../../components/LoginNavbar'
import Products from '../../components/Products'
import Four from '../../components/Four'
import Review from '../../components/Review'
import { Link } from 'react-router-dom'

const Categories = () => {
  return (
    <>
    <LoginNavbar/>
    <Products/>
    <Four/>
    <div className="text-center mt-12">
        <Link to="/addreview" className="bg-black text-white text-xl font-bold px-8 py-4 rounded-full">Write a Review</Link>
    </div>
    <Review/>
    </>
  )
}

export default Categories