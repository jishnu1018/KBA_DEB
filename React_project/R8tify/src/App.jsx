import React from 'react'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Home1 from "./Pages/Home/Home1"
import Home from './Pages/LoginHome/Home'
import Categories1 from './Pages/Home/Categories1'
import Categories from './Pages/LoginHome/Categories'
import EditProfile from './Pages/EditProfile'
import Profile from './Pages/LoginHome/Profile'
import Addreview from './Pages/LoginHome/Addreview'
import Adminadd from './Pages/ADMIN/Adminadd'
import Admin from './Pages/ADMIN/Admin'
import Adminusers from './Pages/ADMIN/Adminusers'
import AdminProducts from './Pages/ADMIN/Adminproducts'
import EditProduct from './Pages/ADMIN/EditProduct'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Navigate to="/signup" />} />
    <Route path="/login" element={<Login />} />
    <Route path='/signup' element={<Signup />} />
    <Route path='/home1' element={<Home1 />} />
    <Route path='/home' element={<Home />} />
    <Route path='/categories1' element={<Categories1 />} />
    <Route path='/categories' element={<Categories />} />
    <Route path='/editprofile' element={<EditProfile />} />
    <Route path='/profile' element={<Profile />} />
    <Route path='/addreview' element={<Addreview />} />
    <Route path='/adminadd' element={<Adminadd/>}/>
    <Route path='/admin' element={<Admin/>}/>
    <Route path='/adminusers' element={<Adminusers/>}/>
    <Route path='/adminproducts' element={<AdminProducts/>}/>
    <Route path='/editproducts/:id' element={<EditProduct/>}/>  {/* Fixed Route */}
    </Routes>
    </BrowserRouter>
  ) 
}

export default App