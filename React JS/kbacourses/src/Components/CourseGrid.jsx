import React from 'react'
import CourseCard from './CourseCard.jsx'

const CourseGrid = ({courses}) => {
  return (
    <div className="grid grid-cols-3 gap-5  mt-16 ml-16">
    
    { courses.map((course) => (
        <CourseCard key={courses.CourseID} course={course} />
    ))

    }
    </div>
  )
}

export default CourseGrid