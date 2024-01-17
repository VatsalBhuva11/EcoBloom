import React from 'react'
import person from '../assets/images/person.png'

export default function Chatbar() {
    return (
        <div>
            <div className="flex flex-col">
                <div className='flex items-center bg-gradient-to-b from-[#0f1035] to-[#4b4e97] p-6 2xl:pb-3 border-b-2 xl:gap-3 2xl:gap-7 px-4 2xl:px-7 hover:scale-105 duration-300'>
                    <img className='w-[73px] h-[71px] 2xl:w-[60px] 2xl:h-[60px] rounded-full' src={person} alt="" />
                    <div className='flex flex-col'><p className='text-[#eef0e5] text-[1.5rem] 2xl:text-xl mt-1 2xl:mt-0'>Ducna Team</p>
                        <p className='text-[#eef0e5] text-[0.75rem] 2xl:text-[1rem]'>32 members</p></div>
                </div>
            </div>
        </div>
    )
}
