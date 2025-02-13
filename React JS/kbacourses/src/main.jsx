import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import Home from './Pages/Home.jsx'
import Add from './Pages/Add.jsx'
 import App from './App.jsx'
import Courses from './Pages/Courses.jsx'
// import Courses from './Pages/Courses.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Add/> */}
   {/* <App/>  */}
   <Courses/>
  </StrictMode>,
)
