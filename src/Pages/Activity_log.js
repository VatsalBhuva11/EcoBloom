import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import logo1 from '../assets/images/banner.png'
import logo3 from '../assets/images/logo3.png'
import { Link } from 'react-router-dom';

const Activity_log = () => {
  return (
    <div className='bg-[#EEF0E5] w-screen h-screen'>
      <div className="flex items-center gap-5 text-[#0F1035] ml-5 pt-2">
        <Link to='/user/dashboard' className="text-xl sm:text-2xl lg:text-3xl mt-1 sm:mt-1 lg:mt-2 cursor-pointer hover:scale-110 duration-300">
        <FaArrowLeft /></Link>
        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            ACTIVITY LOG
        </div>
      </div>
      <div className='px-10 flex flex-col gap-4 mt-5 h-[85%] overflow-scroll overflow-x-hidden'>
        <div className='flex items-center gap-2 w-full bg-[#DFE4C5] p-2 rounded-2xl justify-between'>
          <div className='flex gap-2 items-center'>
            <img src={logo1} className='w-8 h-7 sm:w-12 sm:h-10 xl:w-16 xl:h-12 rounded-full' alt="" />
            <div className=' text-sm sm:text-lg lg:text-xl font-medium'>
              You Have Joined GeekHaven Community.
            </div>
          </div>
          <div className='text-xs  lg:text-sm 2xl:text-base mr-1'>
            02:23PM
          </div>
        </div>
        <div className='flex items-center gap-2 w-full bg-[#DFE4C5] p-2 rounded-2xl justify-between'>
          <div className='flex gap-2 items-center'>
            <img src={logo3} className='w-8 h-7 sm:w-12 sm:h-10 xl:w-16 xl:h-12 rounded-full' alt="" />
            <div className=' text-sm sm:text-lg lg:text-xl font-medium'>
              You Have Registered For OpenCode Campaign.
            </div>
          </div>
          <div className='text-xs  lg:text-sm 2xl:text-base mr-1'>
            02:23PM
          </div>
        </div>
        <div className='flex items-center gap-2 w-full bg-[#DFE4C5] p-2 rounded-2xl justify-between'>
          <div className='flex gap-2 items-center'>
            <img src={logo1} className='w-8 h-7 sm:w-12 sm:h-10 xl:w-16 xl:h-12 rounded-full' alt="" />
            <div className=' text-sm sm:text-lg lg:text-xl font-medium'>
              Alert: You have OpenCode Campaign Tomorrow at 02:23PM.
            </div>
          </div>
          <div className='text-xs  lg:text-sm 2xl:text-base mr-1'>
            02:23PM
          </div>
        </div>
        <div className='flex items-center gap-2 w-full bg-[#DFE4C5] p-2 rounded-2xl justify-between'>
          <div className='flex gap-2 items-center'>
            <img src={logo1} className='w-8 h-7 sm:w-12 sm:h-10 xl:w-16 xl:h-12 rounded-full' alt="" />
            <div className=' text-sm sm:text-lg lg:text-xl font-medium'>
              Yayy!! You are Verified for OpenCode Campaign.
            </div>
          </div>
          <div className='text-xs  lg:text-sm 2xl:text-base mr-1'>
            02:23PM
          </div>
        </div>
        <div className='flex items-center gap-2 w-full bg-[#DFE4C5] p-2 rounded-2xl justify-between'>
          <div className='flex gap-2 items-center'>
            <img src={logo1} className='w-8 h-7 sm:w-12 sm:h-10 xl:w-16 xl:h-12 rounded-full' alt="" />
            <div className=' text-sm sm:text-lg lg:text-xl font-medium'>
              Congratulations!! You have Completed OpenCode Campaign Successfully.
            </div>
          </div>
          <div className='text-xs  lg:text-sm 2xl:text-base mr-1'>
            02:23PM
          </div>
        </div>
        <div className='flex items-center gap-2 w-full bg-[#DFE4C5] p-2 rounded-2xl justify-between'>
          <div className='flex gap-2 items-center'>
            <img src={logo1} className='w-8 h-7 sm:w-12 sm:h-10 xl:w-16 xl:h-12 rounded-full' alt="" />
            <div className=' text-sm sm:text-lg lg:text-xl font-medium'>
              +10🪙 For your Successful participation in OpenCode Campaign.
            </div>
          </div>
          <div className='text-xs  lg:text-sm 2xl:text-base mr-1'>
            02:23PM
          </div>
        </div>
        <div className='flex items-center gap-2 w-full bg-[#DFE4C5] p-2 rounded-2xl justify-between'>
          <div className='flex gap-2 items-center'>
            <img src={logo1} className='w-8 h-7 sm:w-12 sm:h-10 xl:w-16 xl:h-12 rounded-full' alt="" />
            <div className=' text-sm sm:text-lg lg:text-xl font-medium'>
              You Have Joined GeekHaven Community
            </div>
          </div>
          <div className='text-xs  lg:text-sm 2xl:text-base mr-1'>
            02:23PM
          </div>
        </div>
        <div className='flex items-center gap-2 w-full bg-[#DFE4C5] p-2 rounded-2xl justify-between'>
          <div className='flex gap-2 items-center'>
            <img src={logo1} className='w-8 h-7 sm:w-12 sm:h-10 xl:w-16 xl:h-12 rounded-full' alt="" />
            <div className=' text-sm sm:text-lg lg:text-xl font-medium'>
              You Have Joined GeekHaven Community
            </div>
          </div>
          <div className='text-xs  lg:text-sm 2xl:text-base mr-1'>
            02:23PM
          </div>
        </div>
        <div className='flex items-center gap-2 w-full bg-[#DFE4C5] p-2 rounded-2xl justify-between'>
          <div className='flex gap-2 items-center'>
            <img src={logo1} className='w-8 h-7 sm:w-12 sm:h-10 xl:w-16 xl:h-12 rounded-full' alt="" />
            <div className=' text-sm sm:text-lg lg:text-xl font-medium'>
              You Have Joined GeekHaven Community
            </div>
          </div>
          <div className='text-xs  lg:text-sm 2xl:text-base mr-1'>
            02:23PM
          </div>
        </div>
        <div className='flex items-center gap-2 w-full bg-[#DFE4C5] p-2 rounded-2xl justify-between'>
          <div className='flex gap-2 items-center'>
            <img src={logo1} className='w-8 h-7 sm:w-12 sm:h-10 xl:w-16 xl:h-12 rounded-full' alt="" />
            <div className=' text-sm sm:text-lg lg:text-xl font-medium'>
              You Have Joined GeekHaven Community
            </div>
          </div>
          <div className='text-xs  lg:text-sm 2xl:text-base mr-1'>
            02:23PM
          </div>
        </div>
        <div className='flex items-center gap-2 w-full bg-[#DFE4C5] p-2 rounded-2xl justify-between'>
          <div className='flex gap-2 items-center'>
            <img src={logo1} className='w-8 h-7 sm:w-12 sm:h-10 xl:w-16 xl:h-12 rounded-full' alt="" />
            <div className=' text-sm sm:text-lg lg:text-xl font-medium'>
              You Have Joined GeekHaven Community
            </div>
          </div>
          <div className='text-xs  lg:text-sm 2xl:text-base mr-1'>
            02:23PM
          </div>
        </div>
        <div className='flex items-center gap-2 w-full bg-[#DFE4C5] p-2 rounded-2xl justify-between'>
          <div className='flex gap-2 items-center'>
            <img src={logo1} className='w-8 h-7 sm:w-12 sm:h-10 xl:w-16 xl:h-12 rounded-full' alt="" />
            <div className=' text-sm sm:text-lg lg:text-xl font-medium'>
              You Have Joined GeekHaven Community
            </div>
          </div>
          <div className='text-xs  lg:text-sm 2xl:text-base mr-1'>
            02:23PM
          </div>
        </div>
      </div>
    </div>
  )
}

export default Activity_log
