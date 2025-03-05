import React from 'react'
import { phone,console,laptop,camera } from '../assets/Images/Images'

const Four = () => {
  return (
    <>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 px-8">
            <div class="bg-black w-full h-64 rounded-xl flex flex-col items-center">
                <a href="#">
                    <img src={phone} alt="Smartphones" class="w-48 h-48 rounded-full mt-2"/>
                    <p class="text-white font-bold">Smartphones</p>
                </a>
            </div>
            <div class="bg-black w-full h-64 rounded-xl flex flex-col items-center">
                <a href="#">
                    <img src={console} alt="Gaming Consoles" class="w-48 h-48 rounded-full mt-2"/>
                    <p class="text-white font-bold">Gaming Consoles</p>
                </a>
            </div>
            <div class="bg-black w-full h-64 rounded-xl flex flex-col items-center">
                <a href="#">
                    <img src={laptop} alt="Laptops" class="w-48 h-48 rounded-full mt-2"/>
                    <p class="text-white font-bold">Laptops</p>
                </a>
            </div>
            <div class="bg-black w-full h-64 rounded-xl flex flex-col items-center">
                <a href="#">
                    <img src={camera} alt="Cameras" class="w-48 h-48 rounded-full mt-2"/>
                    <p class="text-white font-bold">Cameras</p>
                </a>
            </div>
        </div>
    </>
  )
}

export default Four