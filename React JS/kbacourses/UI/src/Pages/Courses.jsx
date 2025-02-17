import React from 'react'
import Nav from '../Components/Nav.jsx'
import CourseGrid from '../Components/CourseGrid.jsx'
import courses from '../assets/data/course.json'

const Courses = () => {
  return (
    <>
    <Nav/>
    <CourseGrid courses={courses}/>
</> 
 )
}

export default Courses