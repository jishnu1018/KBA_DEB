import React from 'react'
import Nav from '../Components/Nav.jsx'
import Hero from '../Components/Hero.jsx'
import Topcourse from '../Components/Topcourse.jsx'
import courses from '../assets/data/course.json'
import CourseGrid from '../Components/CourseGrid.jsx'
import Footer from '../Components/Footer.jsx'

const Home = () => {
  return (
    <>
    <Nav/>
    <Hero/>
    <Topcourse/>
    <CourseGrid courses={courses}/>
    <Footer/>
    </>
    
   
  )
}

export default Home