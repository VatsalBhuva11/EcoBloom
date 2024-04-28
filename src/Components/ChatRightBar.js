import React, { useContext } from "react";
import person from "../assets/images/person.png";
import member from "../assets/images/member.png";
import deleteicon from "../assets/images/delete.png";
import { ChatContext } from "./ChatContextProvider";

export default function ChatRightBar() {
    const { currComm, setCurrComm, communities, setCommunities } =
        useContext(ChatContext);
    console.log(currComm);

    return (
        <div className="h-screen fixed">
            <div className="flex">
                <div className="lg:flex  bg-[#0f1035] w-[100%] flex-col h-screen pb-2 border-[#fbfbfa]">
                    {/* <div className="flex justify-between items-center mt-5 mb-5 p-[1.5rem] border-b-2 border-b-gray-300">
                        <div className=' text-[25px] font-inter text-gray-300'>Group Info</div>
                        <img className='w-[18px] h-[22px] 2xl:w-[24px] 2xl:h-[32px] cursor-pointer hover:scale-105 duration-300 rounded-full ' src={arrow} alt="" />
                    </div> */}
                    <div className="message flex flex-col items-center justify-center mt-5">
                        <img
                            className="w-[105px] h-[100px] 2xl:w-[137px] 2xl:h-[145px] rounded-full"
                            src={currComm.logo}
                            alt=""
                        />
                        <div className="text-[23px] font-inter text-gray-300 mt-2">
                            {currComm?.orgName}
                        </div>
                        <div className="text-[15px] font-inter text-gray-300">
                            {currComm?.userCount} members
                        </div>
                    </div>
                    <div className="description mt-4 p-3">
                        <div className="desc1 font-inter text-gray-200 text-[20px]">
                            Description
                        </div>
                        <div className="desc2 font-inter text-gray-500 text-[10px] w-fit">
                            {currComm?.organization?.description}
                        </div>
                    </div>

                    <div className="mt-3">
                        <div className=" flex items-center">
                            <img
                                className="w-[30px] h-[30px] 2xl:w-[50px] 2xl:h-[50px] cursor-pointer rounded-full hover:scale-105 duration-300"
                                src={member}
                                alt=""
                            />
                            <div className="member text-[20px] font-inter text-gray-300">
                                Members
                            </div>
                        </div>
                        <div className="flex  h-full overflow-scroll  scrollbar-hide overflow-x-hidden flex-col gap-3 2xl:gap-5 p-4">
                            {currComm?.joinedUsers?.map((member) => (
                                <a href="">
                                    <div className=" flex items-center mx-1 mt-1">
                                        <img
                                            className="w-[25px] h-[25px] 2xl:w-[50px] 2xl:h-[50px] cursor-pointer rounded-full hover:scale-105 duration-300  "
                                            src={person}
                                            alt=""
                                        />

                                        <div className="member ml-2  text-[15px] font-inter text-gray-300">
                                            {member.name}
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                        {/* <div className=" text-end text-gray-300 text-[12px] border-b-2 border-b-gray-300 hover:undeline cursor-pointer font-inter"></div> */}

                        {/* <div className="mt-4 cursor-pointer flex justify-center items-center  ">
                            <img
                                className="w-[25px] h-[25px] 2xl:w-[50px] 2xl:h-[50px] cursor-pointer rounded-full"
                                src={deleteicon}
                                alt=""
                            />
                            <div className=" font-inter text-red-500 font-bold text-[20px] hover:underline">
                                Leave Community
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
