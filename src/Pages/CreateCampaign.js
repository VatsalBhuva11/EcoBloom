import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const CreateCampaign = () => {
  return (
    <div className='w-full h-screen p-8 sm:p-12 lg:p-20 bg-[#EEF0E5] flex flex-col justify-evenly gap-1 sm:gap-3'>
      
        <div className='flex items-center gap-5 text-[#0F1035]'>
          <a className='text-2xl sm:text-4xl lg:text-5xl mt-1 sm:mt-2 lg:mt-3 cursor-pointer hover:scale-110 duration-300'>
            <FaArrowLeft/>
          </a>
          <div className='text-3xl sm:text-5xl lg:text-6xl font-bold'>
            CREATE CAMPAIGN
          </div>
        </div>
        <div className='flex gap-5'>
          <div className='flex flex-col w-full sm:w-[74%] gap-2 lg:gap-3'>
            <div className='text-[1.35rem] sm:text-[1.6rem] lg:text-3xl font-bold text-[#333333]'>
              Campaign Name*
            </div>
            <div>
              <input className='w-full h-[40px] sm:h-[50px] rounded-lg bg-[#CFD6DE] px-2 sm:px-4 text-xl sm:text-[1.4rem] hover:scale-103 duration-300' placeholder='Greenvalley Campaign' type="text" />
            </div>
          </div>
          <div className='hidden sm:flex flex-col w-[25%] gap-2 lg:gap-3'>
            <div className='text-[1.35rem] sm:text-[1.6rem] lg:text-3xl font-bold text-[#333333]'>
              Start Date*
            </div>
            <div>
              <input className='w-full h-[40px] sm:h-[50px] rounded-lg bg-[#CFD6DE] px-2 sm:px-4 text-xl sm:text-[1.4rem] hover:scale-103 duration-300' type="date" />
            </div>
          </div>
        </div>
        <div className='flex gap-5'>
          <div className='flex flex-col w-full sm:w-[74%] gap-2 lg:gap-3'>
            <div className='text-[1.35rem] sm:text-[1.6rem] lg:text-3xl font-bold text-[#333333]'>
              Campaign Location*
            </div>
            <div>
              <input className='w-full h-[40px] sm:h-[50px] rounded-lg bg-[#CFD6DE] px-2 sm:px-4 text-xl sm:text-[1.4rem] hover:scale-103 duration-300' placeholder='Greenvalley Campaign' type="text" />
            </div>
            <div className='flex text-[#862B2B] text-[1rem] sm:text-lg lg:text-xl font-bold items-center'>
              <div><FaLocationDot/></div>
              <div className='text-[1.3rem]'>Mark Location On Map</div>
            </div>
          </div>
          <div className='hidden sm:flex flex-col w-[25%] gap-2 lg:gap-3'>
            <div className='text-[1.35rem] sm:text-[1.6rem] lg:text-3xl font-bold text-[#333333]'>
              End Date*
            </div>
            <div>
              <input className='w-full h-[40px] sm:h-[50px] rounded-lg bg-[#CFD6DE] px-2 sm:px-4 text-xl sm:text-[1.4rem] hover:scale-103 duration-300' type="date" />
            </div>
          </div>
        </div>
        <div className='flex sm:hidden justify-between'>
          <div className='flex flex-col w-[40%] gap-2 lg:gap-3'>
            <div className='text-[1.35rem] sm:text-[1.6rem] lg:text-3xl font-bold text-[#333333]'>
              Start Date*
            </div>
            <div>
              <input className='w-full h-[40px] sm:h-[50px] rounded-lg bg-[#CFD6DE] px-2 sm:px-4 text-xl sm:text-[1.4rem] hover:scale-103 duration-300' type="date" />
            </div>
          </div>
          <div className='flex flex-col w-[40%] gap-2 lg:gap-3'>
            <div className='text-[1.35rem] sm:text-[1.6rem] lg:text-3xl font-bold text-[#333333]'>
              End Date*
            </div>
            <div>
              <input className='w-full h-[40px] sm:h-[50px] rounded-lg bg-[#CFD6DE] px-2 sm:px-4 text-xl sm:text-[1.4rem] hover:scale-103 duration-300' type="date" />
            </div>
          </div>
        </div>
        <div className='flex flex-col w-full sm:w-[74%] gap-2 lg:gap-3'>
          <div className='text-[1.35rem] sm:text-[1.6rem] lg:text-3xl font-bold text-[#333333]'>
            Campaign Code*
          </div>
          <div>
            <input className='w-full h-[40px] sm:h-[50px] rounded-lg bg-[#CFD6DE] px-2 sm:px-4 text-xl sm:text-[1.4rem] hover:scale-103 duration-300' placeholder='Greenvalley Campaign' type="text" />
          </div>
        </div>
        <div className='flex flex-col w-full sm:w-[74%] gap-2 lg:gap-3'>
          <div className='text-[1.35rem] sm:text-[1.6rem] lg:text-3xl font-bold text-[#333333]'>
            Campaign Goal*
          </div>
          <div>
            <input className='w-full h-[40px] sm:h-[50px] rounded-lg bg-[#CFD6DE] px-2 sm:px-4 text-xl sm:text-[1.4rem] hover:scale-103 duration-300' placeholder='Greenvalley Campaign' type="text" />
          </div>
        </div>
        <div className='flex gap-10'>
          <button className='text-xl sm:text-2xl bg-[#0F1035] text-[#EEF0E5] w-40 h-12 rounded-lg'>
            CREATE
          </button>
          <button className='text-xl sm:text-2xl bg-[#EEF0E5] text-[#0F1035] w-40 h-12 rounded-lg border-2 border-[#0F1035]'>
            CANCEL
          </button>
        </div>
      
    </div>
  )
}

export default CreateCampaign
