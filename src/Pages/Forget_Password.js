import React from 'react'
import forget_password from '../assets/images/forget_password.png'
import { Link } from 'react-router-dom'

const Forget_Password = () => {
  return (
    <div className='h-screen bg-[#EEF0E5] flex justify-around items-center'>
      <div className='flex flex-col justify-around items-center sm:items-start h-[30%] xl:h-[40%] ml-5 '>
        <div className='hidden sm:flex sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-medium  items-start'>
          FORGOT <br /> PASSWORD?
        </div>
        <div className='flex sm:hidden text-3xl font-medium'>FORGOT PASSWORD?</div>
        <div className='flex flex-col items-center sm:items-start gap-2'>
          <input type="email" className='bg-[#CCD994] text-[#685E5E] placeholder:text-[#464444] placeholder:xl:text-lg placeholder:lg:text-md placeholder:text-sm h-8 md:h-9 lg:h-10  sm:w-52 md:w-60 lg:w-72 xl:w-96 rounded-xl p-3 w-80' placeholder='📧 Enter Your E-mail' />
          <button className='sm:h-8 md:h-9 lg:h-10  sm:w-52 md:w-60 lg:w-72 xl:w-96 bg-[#CB4331] text-[#eef0e5] rounded-xl sm:text-sm lg:text-md xl:text-lg w-80 h-8'>SEND RESET LINK</button>
          <div className='flex text-md gap-1 ml-2'><p>Back To</p><Link to='/login' className='text-green-700 hover:border-b-2 hover:border-green-700' href="">SIGN IN</Link></div>
        </div>
      </div>
      <div>
        <img className='hidden sm:flex' src={forget_password} alt="" />
      </div>
    </div>
  )
}

export default Forget_Password
