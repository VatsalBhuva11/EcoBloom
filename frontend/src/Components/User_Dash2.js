import React from "react";
import banner from "../assets/images/banner1.jpg";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

const User_Dash2 = () => {
  return (
    <div className="h-full">
      <div className="bg-[#277868] pt-[1.3rem] pb-[10.3rem] h-[15rem]">
        <div className="text-4xl flex justify-center font-semibold text-[#D1D1D1] pb-[2.6rem]">
          JOINED COMMUNITITES
        </div>
        <div className="relative w-full flex justify-around px-12">
          <div className="bg-gradient-to-br from-[#407D71] to-[#064236] flex-col rounded-lg pb-4 h-[12.5rem] w-[30%]">
            <div className="w-[100%] h-[8.5rem] rounded-xl relative bg-cover">
              <img
                className="rounded-xl object-cover object-top h-full w-full"
                src={banner}
                alt=""
              />
            </div>
            <div className="ml-4">
              <div className="text-xl lg:text-xl font-semibold text-[#FBFBFA]">
                GeekHaven, IIIT Allahabad
              </div>
              <div className="text-sm text-[#FBFBFA]">2K Members</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#407D71] to-[#064236] flex-col rounded-lg pb-4 h-[12.5rem] w-[30%]">
            <div className="w-[100%] h-[8.5rem] overflow-hidden rounded-xl">
              <img
                className="rounded-xl object-cover object-top h-full w-full"
                src={banner}
                alt=""
              />
            </div>
            <div className="ml-4">
              <div className="text-xl lg:text-xl font-semibold text-[#FBFBFA]">
                GeekHaven, IIIT Allahabad
              </div>
              <div className="text-sm text-[#FBFBFA]">2K Members</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#407D71] to-[#064236] flex-col rounded-lg pb-4 h-[12.5rem] w-[30%]">
            <div className="w-[100%] h-[8.5rem] overflow-hidden rounded-xl">
              <img
                className="rounded-xl object-cover object-top h-full w-full"
                src={banner}
                alt=""
              />
            </div>
            <div className="ml-4">
              <div className="text-xl lg:text-xl font-semibold text-[#FBFBFA]">
                GeekHaven, IIIT Allahabad
              </div>
              <div className="text-sm text-[#FBFBFA]">2K Members</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[4rem] flex justify-end pr-6 pt-1">
        <button className="text-[#277868] px-3 py-1 mr-12 border-2 border-[#277868] text-lg rounded-md hover:shadow-xl mt-1">
          <div className="flex items-center gap-1 font-semibold">
            View All <FaArrowRightLong />
          </div>
        </button>
      </div>
      <div className="flex justify-center pr-6 pt-1 pb-3">
        <button className="bg-[#277868] text-[#FBFBFA] px-3 py-1 border border-[#277868] text-xl font-semibold rounded-md hover:shadow-xl">
          <div className="flex items-center gap-1">
            <FaPlus /> Join Community
          </div>
        </button>
      </div>
    </div>
  );
};

export default User_Dash2;
