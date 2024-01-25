import React from 'react'
import { FaArrowRightLong , FaLocationDot } from "react-icons/fa6"
import { SlCalender } from "react-icons/sl";
import campaignbanner from '../assets/images/campaignbanner.png'

export default function PastCampaignsCards() {
  return (
    <div>
      <div className='w-[21.5rem] lg:w-[24.5rem] bg-[#DFE4C5] flex flex-col justify-between rounded-lg h-72 lg:h-64'>
                <div className="card">
                  <div className="flex flex-col">
                    <div className="w-[21.5rem] lg:w-[24.5rem] h-20 p-2 overflow-hidden">
                      <img
                        className="rounded-xl bg-cover"
                        src={campaignbanner}
                        alt=""
                      />
                    </div>
                    <div className=" ml-4">
                      <div className="text-lg lg:text-xl font-medium">
                        GeekHaven, IIIT Allahabad
                      </div>
                      <div>
                        The Technical Club of Indian Institute of
                        Infromation Technology, Allahabad
                      </div>
                      <div className="text-xs">2K Members</div>
                      <div className='flex items-center gap-1 text-[#2A7805] font-bold'><FaLocationDot />Old Naini Bridge</div>
                      <div className='flex items-center gap-1 text-[#2A7805] text-sm'><SlCalender />21st-23rd Jan'24</div>
                    </div>
                  </div>
                  <div className='w-full flex justify-end pr-3'>
                    <button className="w-36 h-7 text-[16px] text-[#eef0e5] rounded-3xl bg-[#0F1035] hover:scale-105 duration-200 flex justify-center gap-1">
                      View Details
                      <div className="text-md mt-[0.34rem]">
                        <FaArrowRightLong />{" "}
                      </div>
                    </button>
                  </div>
                </div>

              </div>
    </div>
  )
}
