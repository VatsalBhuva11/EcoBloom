import React from "react";
import joinUs from "../assets/images/joinUs.png";
import { IoIosPeople } from "react-icons/io";

export default function JoinUs() {
  return (
    <div name="support" className="w-full">
      <div className="w-full h-[500px] absolute">
        <img className="w-full h-full object-cover " src={joinUs} alt="" />
      </div>
      <div className="max-w-[1240px] mx-auto relative">
        <div className="px-4 py-12 flex flex-col justify-center items-center">
          <h2 className=" z-2 text-[#0F1035] text-4xl md:text-6xl text-center font-bold">
            JOIN US NOW
          </h2>
          <button className=" flex mt-32 py-2 px-6 text-center md:text-3xl mb-10 text-gray-100 border bg-[#0F1035] font-bold hover:bg-[#000000] hover:text-[#ffff] hover:shadow-lg hover:border-indigo-600 rounded-md">
            JOIN COMMUNITY{" "}
            <IoIosPeople className="hidden md:flex ml-4 mt-1 " size={35} />
          </button>
        </div>
      </div>
    </div>
  );
}
