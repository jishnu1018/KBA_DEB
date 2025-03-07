import React from 'react'
import LikeButton from './LikeButton'

const Review = () => {

    
  return (
   <>
        <div className="max-w-4xl mx-auto mt-8 space-y-4">
            <div className="border-2 border-black rounded-3xl p-4">
                <div className="flex items-center space-x-4">
                <img alt="" src='' className="rounded-full w-14 h-16"/>
                <div>
                    <p className="text-2xl">Han Lue</p>
                    <img className="w-40" />
                </div>
                <div className="text-center text-red-400 text-2xl font-bold">Samsung Galaxy S23 Ultra<br/>
                    <span className="text-black text-lg font-bold">Very poor UX choices</span>
                </div>
            </div>
            <p className="mt-2 text-lg">The camera quality is worse than my five year old Oppo Find X2 Pro. You cannot turn off most 'image enhancements' and third-party camera apps aren't allowed to make use of the full sensor.</p>
            <div className="flex items-center mt-2">
                <LikeButton/>
            </div>
        </div>
        </div>
    </>
  )
  
}

export default Review