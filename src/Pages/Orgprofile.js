import React from "react";
import p1 from "../assets/images/p1.png";
import p2 from "../assets/images/p2.png";
import p3 from "../assets/images/p3.png";
import p4 from "../assets/images/p4.png";
import p5 from "../assets/images/p5.png";
import p6 from "../assets/images/p6.png";
import org_logo from "../assets/images/org_logo.png";
import bannerorg from "../assets/images/bannerorg.png";
import logo from "../assets/images/logo.png";
import { IoIosSend } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
const Orgprofile = () => {
  return (
    <div className="flex">
      <div className=" flex flex-col w-full h-screen md:w-[75%]">
        {/* navbar */}
        <div className="w-full bg-[#0f1035] text-gray-200 flex shadow-2xl h-[10%] ">
          <div className="flex items-center ">
            <img className="h-12 md:h-16 mt-2" src={logo} alt="" />
            <input
              type="search"
              id="default-search"
              class=" md:ml-2 py-1 px-2 text-md lg:text-xl text-gray-200 rounded-lg bg-[#353657] focus:ring-white focus:border-white w-[250px] md:w-[450px]"
              placeholder="search"
            />
          </div>
        </div>
        {/* navbar */}
        <div className="w-full h-[90%] bg-[#EEF0E5] overflow-scroll pt-2">
          <div className="mx-2 flex flex-col bg-[#DFE4C5] rounded-lg">
            <div className=" ">
              <img
                className="h-32 sm:h-36 md:h-48 w-full "
                src={bannerorg}
                alt=""
              />
            </div>

            <div className="flex border-b-2 pb-5 border-[#7A7A7A]">
              <div className="w-[20%] md:w-[15%]">
                <img
                  className="h-16 sm:h-24 md:h-32 mt-[-32px] md:mt-[-48px] pl-4"
                  src={org_logo}
                  alt=""
                />
              </div>
              <div className="flex flex-col pt-2 pl-2 md:pl-4 ">
                <h1 className="text-[#0f1035] md:pt-4 font-bold text-xl sm:text-2xl md:text-4xl">
                  GeekHaven, IIT Allahabad
                </h1>
                <p className="text-[14px] sm:text-lg md:text-2xl pt-1 sm:pt-3">
                  The Technical Club Information Technology, Allahabad
                </p>
                <p className="text-[14px] sm:text-lg md:text-xl pt-1 sm:pt-1">
                  Allahabad, Uttar Pradesh 3K Members
                </p>
                <div className="flex pt-3 md:pt-6  gap-3 sm:gap-4 md:gap-6 ">
                  <button className="border-solid border-2 border-[#0f1035] hover:scale-105 duration-300 bg-transparent  flex text-[#0f1035] rounded-3xl py-1 px-3 sm:py-1.5 sm:px-4 text-md sm:text-lg md:text-xl sm:gap-1 md:gap-2 font-semibold ">
                    <IoIosSend className="sm:flex hidden" size={30} /> Community
                    Chat
                  </button>
                  <button className="bg-[#0f1035] flex hover:scale-105 duration-300 text-gray-200 rounded-3xl py-1 px-3 sm:py-1.5 sm:px-6 text-md sm:text-lg md:text-xl sm:gap-3 md:gap-2 font-semibold">
                    <FaPlus className="pt-1 sm:flex hidden" size={28} /> Join
                    Community
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-2  ml-6  pr-2">
              <div className="flex gap-6 sm:gap-10 md:gap-12 pb-2">
                <p className="text-md sm:text-lg md:text-xl ">ABOUT</p>
                <p className="text-md sm:text-lg md:text-xl font-semibold">
                  POSTS
                </p>
                <p className="text-md sm:text-lg md:text-xl">PEOPLE</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-6">
            <div>
              <img className="h-auto max-w-full" src={p4} alt="" />
            </div>
            <div>
              <img className="h-auto max-w-full" src={p5} alt="" />
            </div>
            <div>
              <img className="h-auto max-w-full" src={p6} alt="" />
            </div>
            <div>
              <img className="h-auto max-w-full" src={p1} alt="" />
            </div>
            <div>
              <img className="h-auto max-w-full" src={p2} alt="" />
            </div>
            <div>
              <img className="h-auto max-w-full" src={p3} alt="" />
            </div>
          </div>
        </div>
      </div>
      {/* user profile ends */}
      <div className="hidden md:flex md:w-[25%]">
        <div className="flex flex-col items-center h-screen w-full bg-[#0f1035] text-gray-200 shadow-3xl pt-12">
          <div className=" flex"></div>
          <div className=" ">
            <p className="text-[#eef0e5] lg:text-2xl md:text-xl md:mt-2  lg:mt-1 font-semibold">
              Past Campaigns
            </p>
          </div>

          <div className="flex mt-6 px-6 border-b border-gray-300 pb-3 w-[95%]">
            <h4 className="md:text-sm lg:text-lg lg:mt-3">24 AUG'23</h4>
            <div className="flex flex-col lg:ml-6 md:ml-3 ">
              <p className="md:text-md lg:text-lg font-semibold">ECO HELPERS</p>
              <p className="hidden lg:flex md:text-sm lg:text-md">
                345 People attended
              </p>
            </div>
          </div>

          <div className="flex mt-6 px-6 border-b border-gray-300 pb-3 w-[95%]">
            <h4 className="md:text-sm lg:text-lg lg:mt-3">24 AUG'23</h4>
            <div className="flex flex-col lg:ml-6 md:ml-3 ">
              <p className="md:text-md lg:text-lg font-semibold">ECO HELPERS</p>
              <p className="hidden lg:flex md:text-sm lg:text-md">
                345 People attended
              </p>
            </div>
          </div>

          <div className="flex mt-6 px-6 border-b border-gray-300 pb-3 w-[95%]">
            <h4 className="md:text-sm lg:text-lg lg:mt-3">24 AUG'23</h4>
            <div className="flex flex-col lg:ml-6 md:ml-3 ">
              <p className="md:text-md lg:text-lg font-semibold">ECO HELPERS</p>
              <p className="hidden lg:flex md:text-sm lg:text-md">
                345 People attended
              </p>
            </div>
          </div>

          <div className="flex mt-6 px-6 border-b border-gray-300 pb-3 w-[95%] ">
            <h4 className="md:text-sm lg:text-lg lg:mt-3">24 AUG'23</h4>
            <div className="flex flex-col lg:ml-6 md:ml-3 ">
              <p className="md:text-md lg:text-lg font-semibold">ECO HELPERS</p>
              <p className="hidden lg:flex md:text-sm lg:text-md">
                345 People attended
              </p>
            </div>
          </div>

          <div className="flex mt-6 px-6 border-b border-gray-300 pb-3 w-[95%]">
            <h4 className="md:text-sm lg:text-lg lg:mt-3">24 AUG'23</h4>
            <div className="flex flex-col lg:ml-6 md:ml-3 ">
              <p className="md:text-md lg:text-lg font-semibold">ECO HELPERS</p>
              <p className="hidden lg:flex md:text-sm lg:text-md">
                345 People attended
              </p>
            </div>
          </div>

          <div className="flex mt-6 px-6 border-b border-gray-300 pb-3 w-[95%]">
            <h4 className="md:text-sm lg:text-lg lg:mt-3">24 AUG'23</h4>
            <div className="flex flex-col lg:ml-6 md:ml-3 ">
              <p className="md:text-md lg:text-lg font-semibold">ECO HELPERS</p>
              <p className="hidden lg:flex md:text-sm lg:text-md">
                345 People attended
              </p>
            </div>
          </div>

          <button className=" flex justify-center items-center gap-2 bg-[#eef0e5] text-[#0f1035] md:text-[16px] lg:text-[18px] 2xl:text-[20px] font-bold rounded-lg  md:h-[2.2rem] lg:h-[2.4rem]  2xl:h-[2.8rem] md:w-24 lg:w-36 2xl:w-64 hover:scale-105 duration-300 mt-10">
            View All <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orgprofile;
