import React from 'react'
import banner from "../assets/images/banner1.png";
import { MdLocationPin } from "react-icons/md";
import { SlCalender } from "react-icons/sl";

const Card_line = () => {
  return (
    <div className="flex justify-between pr-10 py-3">
      <div className="flex items-center gap-3">
        <div>
          <img
            src={banner}
            alt=""
            className="h-[7rem] w-[15rem] object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-[#277868] text-2xl font-semibold">
            GeekHaven Camp
          </div>
          <div className="flex items-center gap-1 text-[#277868] text-xl">
            <MdLocationPin /> Old Naini Bridge, Allahabad, India
          </div>
          <div className="flex items-center gap-1 text-[#686968] text-xl font-semibold">
            <SlCalender /> 21st-23rd Jan'24
          </div>
        </div>
      </div>
      <div>
        <button className="px-3 py-1 text-[#EEEEEE] bg-[#277868] text-lg rounded-lg mr-3 hover:shadow-xl">
          EXPLORE
        </button>
      </div>
    </div>
  );
}

export default Card_line
