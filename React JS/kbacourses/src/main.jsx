import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import Home from './Pages/Home.jsx'
// import Add from './Add.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Add/> */}
    <App/>
  </StrictMode>,
)
