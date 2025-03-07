import React from 'react'
import { phone,console,laptop,camera } from '../assets/Images/Images'

const Four = () => {
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 px-8">
            <div className="bg-black w-full h-64 rounded-xl flex flex-col items-center">
                <a href="#">
                    <img src={phone} alt="Smartphones" className="w-48 h-48 rounded-full mt-2"/>
                    <p className="text-white font-bold">Smartphones</p>
                </a>
            </div>
            <div className="bg-black w-full h-64 rounded-xl flex flex-col items-center">
                <a href="#">
                    <img src={console} alt="Gaming Consoles" className="w-48 h-48 rounded-full mt-2"/>
                    <p className="text-white font-bold">Gaming Consoles</p>
                </a>
            </div>
            <div className="bg-black w-full h-64 rounded-xl flex flex-col items-center">
                <a href="#">
                    <img src={laptop} alt="Laptops" className="w-48 h-48 rounded-full mt-2"/>
                    <p className="text-white font-bold">Laptops</p>
                </a>
            </div>
            <div className="bg-black w-full h-64 rounded-xl flex flex-col items-center">
                <a href="#">
                    <img src={camera} alt="Cameras" className="w-48 h-48 rounded-full mt-2"/>
                    <p className="text-white font-bold">Cameras</p>
                </a>
            </div>
        </div>
    </>
  )
}

export default Four