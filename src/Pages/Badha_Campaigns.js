import React from 'react'
import logo_new from "../assets/images/logo_new.png"
import face from "../assets/images/face.jpg"
import banner from "../assets/images/banner.png"
import logo_commu from "../assets/images/logo_commu.jpg"
import { FaArrowRightLong } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";

const Badha_Campaigns = () => {
  return (
    <div className='h-screen w-full bg-[#eef0e5]'>
      <div className='flex items-center justify-between '>
        <img className='w-16 md:w-20 lg:w-24 ml-2 mt-1' src={logo_new} alt="" />
        <div className='flex items-center mr-4 gap-3'>
          <img className='w-9 md:w-12 lg:w-14 h-9 md:h-12 lg:h-14 rounded-full' src={face} alt="" />
          <p className='hidden sm:flex text-xl font-medium'>Hizrain</p>
        </div>
      </div> 
      <div className='flex flex-col mt-2 mx-5 gap-2'>
        <div className='font-bold text-2xl text-[#4D8E11]'>
          Ongoing Campaign
        </div>
        <div className='w-full flex flex-row overflow-scroll gap-24 overflow-y-hidden pb-2 pl-12'>
            <div className='w-[21.5rem] lg:w-[24.5rem] bg-[#DFE4C5] flex flex-col justify-between rounded-lg h-64 lg:pb-4'>
                <div className="flex flex-col">
                    <div className="w-[21.5rem] lg:w-[24.5rem] h-20 p-2 overflow-hidden">
                        <img
                            className="rounded-xl bg-cover"
                            src={banner}
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
                        <div className='flex items-center gap-1 text-[#2A7805] font-bold'><FaLocationDot/>Old Naini Bridge</div>
                        <div className='flex items-center gap-1 text-[#2A7805] text-sm'><SlCalender/>21st-23rd Jan'24</div>
                    </div>
                </div>
                <div className='w-full flex justify-end pr-3 mb-3 lg:mb-0'>
                    <button className="w-36 h-7 text-[16px] text-[#eef0e5] rounded-3xl bg-[#0F1035] hover:scale-105 duration-200 flex justify-center gap-1">
                    See Profile{" "}
                        <div className="text-md mt-[0.34rem]">
                        {" "}
                        <FaArrowRightLong />{" "}
                        </div>
                    </button>
                </div>
            </div>
            <div className='w-[21.5rem] lg:w-[24.5rem] bg-[#DFE4C5] flex flex-col justify-between rounded-lg h-64 lg:pb-4'>
                <div className="flex flex-col">
                    <div className="w-[21.5rem] lg:w-[24.5rem] h-20 p-2 overflow-hidden">
                        <img
                            className="rounded-xl bg-cover"
                            src={banner}
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
                        <div className='flex items-center gap-1 text-[#2A7805] font-bold'><FaLocationDot/>Old Naini Bridge</div>
                        <div className='flex items-center gap-1 text-[#2A7805] text-sm'><SlCalender/>21st-23rd Jan'24</div>
                    </div>
                </div>
                <div className='w-full flex justify-end pr-3 mb-3 lg:mb-0'>
                            <button className="w-36 h-7 text-[16px] text-[#eef0e5] rounded-3xl bg-[#0F1035] hover:scale-105 duration-200 flex justify-center gap-1">
                            See Profile{" "}
                                <div className="text-md mt-[0.34rem]">
                                {" "}
                                <FaArrowRightLong />{" "}
                                </div>
                            </button>
                </div>
            </div>
            <div className='w-[21.5rem] lg:w-[24.5rem] bg-[#DFE4C5] flex flex-col justify-between rounded-lg h-64 lg:pb-4'>
                <div className="flex flex-col">
                    <div className="w-[21.5rem] lg:w-[24.5rem] h-20 p-2 overflow-hidden">
                        <img
                            className="rounded-xl bg-cover"
                            src={banner}
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
                        <div className='flex items-center gap-1 text-[#2A7805] font-bold'><FaLocationDot/>Old Naini Bridge</div>
                        <div className='flex items-center gap-1 text-[#2A7805] text-sm'><SlCalender/>21st-23rd Jan'24</div>
                    </div>
                </div>
                <div className='w-full flex justify-end pr-3 mb-3 lg:mb-0'>
                            <button className="w-36 h-7 text-[16px] text-[#eef0e5] rounded-3xl bg-[#0F1035] hover:scale-105 duration-200 flex justify-center gap-1">
                            See Profile{" "}
                                <div className="text-md mt-[0.34rem]">
                                {" "}
                                <FaArrowRightLong />{" "}
                                </div>
                            </button>
                </div>
            </div>
            <div className='w-[21.5rem] lg:w-[24.5rem] bg-[#DFE4C5] flex flex-col justify-between rounded-lg h-64 lg:pb-4'>
                <div className="flex flex-col">
                    <div className="w-[21.5rem] lg:w-[24.5rem] h-20 p-2 overflow-hidden">
                        <img
                            className="rounded-xl bg-cover"
                            src={banner}
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
                        <div className='flex items-center gap-1 text-[#2A7805] font-bold'><FaLocationDot/>Old Naini Bridge</div>
                        <div className='flex items-center gap-1 text-[#2A7805] text-sm'><SlCalender/>21st-23rd Jan'24</div>
                    </div>
                </div>
                <div className='w-full flex justify-end pr-3 mb-3 lg:mb-0'>
                            <button className="w-36 h-7 text-[16px] text-[#eef0e5] rounded-3xl bg-[#0F1035] hover:scale-105 duration-200 flex justify-center gap-1">
                            See Profile{" "}
                                <div className="text-md mt-[0.34rem]">
                                {" "}
                                <FaArrowRightLong />{" "}
                                </div>
                            </button>
                </div>
            </div>

        </div>
      </div>
      <div className='flex flex-col mt-2 mx-5 gap-2'>
        <div className='font-bold text-2xl text-[#768469]'>
          Upcoming Campaign
        </div>
        <div className='w-full h-60 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-content-between overflow-scroll overflow-x-hidden gap-y-4 pl-12'>
            {/* div for upcming card */}
            <div className='w-[20.5rem] lg:w-[24.5rem] bg-[#DFE4C5] flex flex-col justify-between rounded-lg h-64 lg:pb-4'>
                <div className="flex flex-col">
                    <div className="w-[21.5rem] lg:w-[24.5rem] h-20 p-2 overflow-hidden">
                        <img
                            className="rounded-xl bg-cover"
                            src={banner}
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
                        <div className='flex items-center gap-1 text-[#768469] font-bold'><FaLocationDot/>Old Naini Bridge</div>
                        <div className='flex items-center gap-1 text-[#768469] text-sm'><SlCalender/>21st-23rd Jan'24</div>
                    </div>
                </div>
                <div className='w-full flex justify-end pr-3 mb-3 lg:mb-0'>
                            <button className="w-36 h-7 text-[16px] text-[#eef0e5] rounded-3xl bg-[#0F1035] hover:scale-105 duration-200 flex justify-center gap-1">
                            See Profile{" "}
                                <div className="text-md mt-[0.34rem]">
                                {" "}
                                <FaArrowRightLong />{" "}
                                </div>
                            </button>
                </div>
            </div>
            <div className='w-[20.5rem] lg:w-[24.5rem] bg-[#DFE4C5] flex flex-col justify-between rounded-lg h-64 lg:pb-4'>
                <div className="flex flex-col">
                    <div className="w-[21.5rem] lg:w-[24.5rem] h-20 p-2 overflow-hidden">
                        <img
                            className="rounded-xl bg-cover"
                            src={banner}
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
                        <div className='flex items-center gap-1 text-[#768469] font-bold'><FaLocationDot/>Old Naini Bridge</div>
                        <div className='flex items-center gap-1 text-[#768469] text-sm'><SlCalender/>21st-23rd Jan'24</div>
                    </div>
                </div>
                <div className='w-full flex justify-end pr-3 mb-3 lg:mb-0'>
                            <button className="w-36 h-7 text-[16px] text-[#eef0e5] rounded-3xl bg-[#0F1035] hover:scale-105 duration-200 flex justify-center gap-1">
                            See Profile{" "}
                                <div className="text-md mt-[0.34rem]">
                                {" "}
                                <FaArrowRightLong />{" "}
                                </div>
                            </button>
                </div>
            </div>
            <div className='w-[20.5rem] lg:w-[24.5rem] bg-[#DFE4C5] flex flex-col justify-between rounded-lg h-64 lg:pb-4'>
                <div className="flex flex-col">
                    <div className="w-[21.5rem] lg:w-[24.5rem] h-20 p-2 overflow-hidden">
                        <img
                            className="rounded-xl bg-cover"
                            src={banner}
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
                        <div className='flex items-center gap-1 text-[#768469] font-bold'><FaLocationDot/>Old Naini Bridge</div>
                        <div className='flex items-center gap-1 text-[#768469] text-sm'><SlCalender/>21st-23rd Jan'24</div>
                    </div>
                </div>
                <div className='w-full flex justify-end pr-3 mb-3 lg:mb-0'>
                            <button className="w-36 h-7 text-[16px] text-[#eef0e5] rounded-3xl bg-[#0F1035] hover:scale-105 duration-200 flex justify-center gap-1">
                            See Profile{" "}
                                <div className="text-md mt-[0.34rem]">
                                {" "}
                                <FaArrowRightLong />{" "}
                                </div>
                            </button>
                </div>
            </div>
            <div className='w-[20.5rem] lg:w-[24.5rem] bg-[#DFE4C5] flex flex-col justify-between rounded-lg h-64 lg:pb-4'>
                <div className="flex flex-col">
                    <div className="w-[21.5rem] lg:w-[24.5rem] h-20 p-2 overflow-hidden">
                        <img
                            className="rounded-xl bg-cover"
                            src={banner}
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
                        <div className='flex items-center gap-1 text-[#768469] font-bold'><FaLocationDot/>Old Naini Bridge</div>
                        <div className='flex items-center gap-1 text-[#768469] text-sm'><SlCalender/>21st-23rd Jan'24</div>
                    </div>
                </div>
                <div className='w-full flex justify-end pr-3 mb-3 lg:mb-0'>
                            <button className="w-36 h-7 text-[16px] text-[#eef0e5] rounded-3xl bg-[#0F1035] hover:scale-105 duration-200 flex justify-center gap-1">
                            See Profile{" "}
                                <div className="text-md mt-[0.34rem]">
                                {" "}
                                <FaArrowRightLong />{" "}
                                </div>
                            </button>
                </div>
            </div>
        </div>
      </div> 
    </div>
  )
}

export default Badha_Campaigns
