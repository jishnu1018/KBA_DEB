import React from 'react'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Categories from './Pages/Categories'
import Profile from './Pages/Profile'
import Addreview from './Pages/Addreview'
import Adminadd from './Pages/ADMIN/Adminadd'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Navigate to="/signup" />} />
    <Route path="/login" element={<Login />} />
    <Route path='/signup' element={<Signup />} />
    <Route path='/home' element={<Home />} />
    <Route path='/categories' element={<Categories />} />
    <Route path='/profile' element={<Profile />} />
    <Route path='/addreview' element={<Addreview />} />
    <Route path='/adminadd' element={<Adminadd/>}/>
    </Routes>
    </BrowserRouter>
  ) 
}

export default App