import React from 'react'
import banner from '../assets/images/banner.png'
import { Link } from "react-router-dom";

export default function SignupInitial() {
  return (
    <div className='bg-[#eef0e5] flex flex-col justify-center items-center p-11 h-screen'>
     <div className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0f1035] font-bold font-inter mb-10 '>JOIN US AS AN</div>
     <img src={banner} alt="" className='hidden sm:flex w-[49%]' />
     <div className='flex flex-col md:gap-20 items-center sm:flex-row sm:items-center md:text-xl '>
      <Link to='/signup/user'>
      <button className='bg-[#0f1035] text-white p-4 m-4 rounded-lg font-bold hover:scale-105 duration-300'>Individual</button>
      </Link>
      {/* <Link to='/signuporg'> */}
      <button className='bg-[#0f1035] text-white p-4 m-4 rounded-lg font-bold hover:scale-105 duration-300'>Organisation</button>
      {/* </Link> */}
      
     </div>
    </div>
  )
}
