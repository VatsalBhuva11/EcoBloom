import React, { useState } from 'react'
import person from '../assets/images/person.png'
import ChatBubbleArrival from './ChatBubbleArrival'
import ChatBubbleDept from './ChatBubbleDept'
import { CiCirclePlus } from "react-icons/ci";
import { IoMdSend } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { IoMdPhotos } from "react-icons/io";
import { IoIosDocument } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import { MdKeyboardVoice, MdSend } from "react-icons/md";

export default function Chatbar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='bg-[#eef0e5] h-screen '>
            <div className=" infobar flex  flex-col">
                <div className='flex items-center bg-gradient-to-b from-[#0f1035] to-[#4b4e97] p-6 2xl:pb-3 border-b-2 xl:gap-3 2xl:gap-7 px-4 2xl:px-7 '>
                    <img className='w-[73px] h-[71px] 2xl:w-[60px] 2xl:h-[60px] rounded-full' src={person} alt="" />
                    <div className='flex flex-col'><p className='text-[#eef0e5] text-[1.5rem] 2xl:text-xl mt-1 2xl:mt-0'>Ducna Team</p>
                        <p className='text-[#eef0e5] text-[0.75rem] 2xl:text-[1rem]'>32 members</p></div>
                </div>
            </div>
            <div className='chatbox h-[75%]  border-black overflow-scroll scrollbar-hide bg-[#eef0e5]'>
                <ChatBubbleArrival />
                <ChatBubbleDept />
                <ChatBubbleArrival />
                <ChatBubbleArrival />
                <ChatBubbleDept />
                <ChatBubbleArrival />
                <ChatBubbleDept />
                <ChatBubbleArrival />
                <ChatBubbleDept />
                <ChatBubbleDept />
                <ChatBubbleDept />
                <ChatBubbleArrival />
                <ChatBubbleDept />
                <ChatBubbleArrival />
                <ChatBubbleDept />
                <ChatBubbleArrival />
                <ChatBubbleDept />
                <ChatBubbleArrival />
                <ChatBubbleDept />
            </div>
            <div className="inputarea">
                <div className='flex items-center ml-5 gap-2'>
                    <button onClick={() => setIsOpen((isOpen) => !isOpen)}
                        className="text-4xl  mt-[11px] cursor-pointer rounded-full">
                    <CiCirclePlus/>
                    {isOpen &&
                    <div className='bg-[#DFE4C5] shadow-lg rounded-2xl p-3 absolute bottom-16'>
                        <div className="flex flex-col text-sm">
                            <div className='flex items-center rounded-lg hover:bg-[#9fa67e]'>
                                <div className="text-xl mr-1">
                                    <IoIosDocument/>
                                </div>
                                <div className="text-lg"> Document</div>
                               </div>
                               <div className='flex items-center rounded-lg hover:bg-[#9fa67e]'>
                                <div className="text-xl mr-1">
                                    <IoMdPhotos/>
                                </div>
                                <div className="text-lg">Photos & Videos</div>
                               </div>
                               <div className='flex items-center rounded-lg hover:bg-[#9fa67e]'>
                                <div className="text-xl mr-1">
                                    <FaCamera/>
                                </div>
                                <div className="text-lg">Camera</div>
                               </div>
                               <div className='flex items-center rounded-lg hover:bg-[#9fa67e]'>
                                <div className="text-xl mr-1">
                                    <MdKeyboardVoice/>
                                </div>
                                <div className="text-lg">Voice</div>
                               </div>
                        </div>
                        </div>}
                    </button>
                    <input type="text" id="text" placeholder='Write your message' class="bg-[#D2D5D4] border border-gray-300 text-gray-900 text-sm rounded-lg placeholder:text-gray-600 focus:border-blue-500 block w-[85%]  mt-2 p-2.5" />
                    <div className="send ml-[10px]">
                        <button className="rounded-full hover:scale-105 duration-300  self-center p-2 mt-[9px] bg-[#20A090]">
                            <div className='text-2xl text-white ml-[3px]'>
                            <IoMdSend/>
                            </div>
                            </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
