import React from "react";
import arrow from "../assets/images/arrow.png";
import message from "../assets/images/message.png";
import person from "../assets/images/person.png";
import logo from '../assets/images/logo.png'
import { Link } from "react-router-dom";

export default function ChatLeftBar() {
  return (
    <div className='h-screen'>
            <div className="flex">
            <div className=' left-sidebar lg:flex bg-[#0F1035] w-[100%] flex-col h-screen pb-2  border-[#eef0e5]'>
                    {/* <div className="Peoples flex justify-around items-center mt-5 mb-5 p-[1.5rem] border-b-2 border-b-gray-300">
                        <img className='w-[50px] h-[50px] 2xl:w-[60px] 2xl:h-[60px] cursor-pointer rounded-full hover:scale-105 duration-300' src={person} alt="" />
                        <img className='w-[50px] h-[50px] 2xl:w-[60px] 2xl:h-[60px] cursor-pointer rounded-full hover:scale-105 duration-300' src={person} alt="" />
                        <img className='w-[50px] h-[50px] 2xl:w-[60px] 2xl:h-[60px] cursor-pointer rounded-full hover:scale-105 duration-300' src={person} alt="" />
                        <img className='w-[50px] h-[50px] 2xl:w-[60px] 2xl:h-[60px] cursor-pointer rounded-full hover:scale-105 duration-300' src={person} alt="" />
                        <img className='w-[18px] h-[28px] 2xl:w-[24px] 2xl:h-[32px] cursor-pointer rounded-full hover:scale-105 duration-300' src={arrow} alt="" />
                    </div> */}
                    <div className="message  flex flex-col mt-3">
                        <div className="firstbar">
                        <div className="flex items-center justify-between mb-3">
                        <Link to='/'><img className="h-12  hover:scale-105 duration-300 md:h-16 mt-2" src={logo} alt="" /></Link>
                            <img className='w-[50px] h-[50px] xl:w-[60px] xl:h-[60px] rounded-full' src={message} alt="" />
                        </div>
                        <div className="search">

                            <form>
                                <div class="relative flex items-center justify-center hover:scale-105 duration-300">
                                    <input type="search" id="default-search" class="block w-[90%] p-2  text-xl text-gray-900 rounded-lg bg-[#353657] focus:ring-blue-500 focus:border-blue-500" placeholder="search" />
                                    
                                </div>
                            </form>
                        </div>
                        </div>
                       
                        <div className="grpmsgs h-[25%] mt-5">
                        <div className="text-[1.25rem] text-gray-300 font-inter mt-5"> Groups & Messages</div>
                        <div className="orgname mt-5 p-2">
                        <a href="">
                        <div className="flex justify-around hover:scale-105 duration-300">
                            <div className='flex pb-5 xl:pb-3  lg:gap-3 xl:gap-7 px-4 xl:px-7 '>
                                <img className='w-[50px] h-[50px] xl:w-[60px] xl:h-[60px] rounded-full' src={person} alt="" />
                                <div className='flex flex-col'><p className='text-gray-300 text-[0.88rem] xl:text-xl mt-1 xl:mt-0'>Ducna Team</p>
                                    <p className='text-gray-300 text-[0.75rem] xl:text-[1rem]'>32 members</p></div>
                            </div>
                            <img className='w-[18px] h-[28px] xl:w-[24px] xl:h-[32px] rounded-full' src={arrow} alt="" />
                            </div>
                        </a>
                        </div>
                        </div>
                    </div>
                    <div className='mt-5 h-[70%] overflow-scroll overflow-x-hidden scrollbar-hide'>
                    <div className='text-[1.5rem] text-gray-300 font-inter '>All messages</div>
                    <div className='flex flex-col gap-4 xl:gap-5 mt-5 ' >
                        <a href="">
                            <div className='flex pb-6 lg:pb-3 border-b-2 lg:gap-3 xl:gap-7 px-4 xl:px-7 hover:scale-105 duration-300'>
                                <img className='w-[50px] h-[50px] xl:w-[50px] xl:h-[50px] rounded-full' src={person} alt="" />
                                <div className='flex flex-col'><p className='text-[#eef0e5] text-[1rem] xl:text-[18px] mt-1 lg:mt-0'>Greenpeace Organisation</p>
                                    <p className='text-[#eef0e5] text-[0.75rem]'>32 members</p></div>
                            </div>
                        </a>
                        <a href="">
                            <div className='flex pb-6 lg:pb-3 border-b-2 lg:gap-3 xl:gap-7 px-4 xl:px-7 hover:scale-105 duration-300'>
                                <img className='w-[50px] h-[50px] xl:w-[50px] xl:h-[50px] rounded-full' src={person} alt="" />
                                <div className='flex flex-col'><p className='text-[#eef0e5] text-[1rem] xl:text-[18px] mt-1 lg:mt-0'>Greenpeace Organisation</p>
                                    <p className='text-[#eef0e5] text-[0.75rem]'>32 members</p></div>
                            </div>
                        </a>
                        <a href="">
                            <div className='flex pb-6 lg:pb-3 border-b-2 lg:gap-3 xl:gap-7 px-4 xl:px-7 hover:scale-105 duration-300'>
                                <img className='w-[50px] h-[50px] xl:w-[50px] xl:h-[50px] rounded-full' src={person} alt="" />
                                <div className='flex flex-col'><p className='text-[#eef0e5] text-[1rem] xl:text-[18px] mt-1 lg:mt-0'>Greenpeace Organisation</p>
                                    <p className='text-[#eef0e5] text-[0.75rem]'>32 members</p></div>
                            </div>
                        </a>
                        <a href="">
                            <div className='flex pb-6 lg:pb-3 border-b-2 lg:gap-3 xl:gap-7 px-4 xl:px-7 hover:scale-105 duration-300'>
                                <img className='w-[50px] h-[50px] xl:w-[50px] xl:h-[50px] rounded-full' src={person} alt="" />
                                <div className='flex flex-col'><p className='text-[#eef0e5] text-[1rem] xl:text-[18px] mt-1 lg:mt-0'>Greenpeace Organisation</p>
                                    <p className='text-[#eef0e5] text-[0.75rem]'>32 members</p></div>
                            </div>
                        </a>
                        <a href="">
                            <div className='flex pb-6 lg:pb-3 border-b-2 lg:gap-3 xl:gap-7 px-4 xl:px-7 hover:scale-105 duration-300'>
                                <img className='w-[50px] h-[50px] xl:w-[50px] xl:h-[50px] rounded-full' src={person} alt="" />
                                <div className='flex flex-col'><p className='text-[#eef0e5] text-[1rem] xl:text-[18px] mt-1 lg:mt-0'>Greenpeace Organisation</p>
                                    <p className='text-[#eef0e5] text-[0.75rem]'>32 members</p></div>
                            </div>
                        </a>
                        <a href="">
                            <div className='flex pb-6 lg:pb-3 border-b-2 lg:gap-3 xl:gap-7 px-4 xl:px-7 hover:scale-105 duration-300'>
                                <img className='w-[50px] h-[50px] xl:w-[50px] xl:h-[50px] rounded-full' src={person} alt="" />
                                <div className='flex flex-col'><p className='text-[#eef0e5] text-[1rem] xl:text-[18px] mt-1 lg:mt-0'>Greenpeace Organisation</p>
                                    <p className='text-[#eef0e5] text-[0.75rem]'>32 members</p></div>
                            </div>
                        </a>
                        
                        
                       
                    </div>
                    </div>
                </div>
            </div>

        </div>
  )
}
