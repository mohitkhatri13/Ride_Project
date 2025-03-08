import React from 'react'
import {NavLink} from 'react-router-dom'
const Start = () => {
  return (
    <div>
       <div className='bg-red-400  w-screen h-screen flex flex-col relative justify-center '>
        <h2 className='text-3xl text-white font-bold ml-8 absolute left-4 top-5'>Airvata</h2>
        
        <div className='absolute bottom-0 w-screen  pb-7 py-4 px-4 bg-white  '>
            <h2 className='text-3xl font-bold'>Welcome to Airvata</h2>
            <NavLink 
            to={"/userlogin"}
            className='bg-black flex items-center justify-center  w-full py-3 rounded mt-5 '> <span className='text-white font-bold text-xl'>Continue</span></NavLink>
        </div>
       </div>
    </div>
  )
}

export default Start
