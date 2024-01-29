import React from "react";
import { useContext ,  useState } from "react";
import { LuTrophy } from "react-icons/lu";
import { FaLocationDot } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { IoIosPeople } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";
import { SiDogecoin } from "react-icons/si";
import logo from "../assets/images/logo.png";
import face from "../assets/images/face.jpg";
import bannerorg from "../assets/images/bannerorg.png";
import org_logo from "../assets/images/org_logo.png";
import { ProfileContext } from "../Components/ProfileContextProvider";
import { Link } from "react-router-dom";



const OrgCampaignProfile = () => {

   const [profile,setProfile] = useContext(ProfileContext);

  return(
  <div className="flex flex-col w-full h-full bg-[#EEF0E5] ">
    {/* navbar */}
    <div className="justify-between fex w-full bg-[#0f1035] text-gray-200 flex shadow-2xl h-[10%]">
      <Link to='/'><img className="h-12  hover:scale-105 cursor-pointer duration-300 md:h-16 mt-2" src={logo} alt="" /></Link>
      <div className="flex mx-2 sm:mx-5 lg:mx-8 items-center pr-4">
        <Link to='/user/profile'><img
          className="mx-4 rounded-full w-[30px] md:w-[45px] hover:scale-110 cursor-pointer duration-300"
          src={profile.url}
          alt=""
        /></Link>
        <div className="md:text-xl text-md">{profile.name}</div>
      </div>
    </div>
    {/* navbar */}
    <div className="w-full p-2 ">
      {/* main profile */}
      <div className="flex flex-col bg-[#DFE4C5] rounded-lg ">
        <div className=" ">
          <img
            className="h-32 sm:h-36 md:h-48 w-full "
            src={bannerorg}
            alt=""
          />
        </div>
        <div className="flex lg:pb-12 lg:mt-6 md:pb-8 md:mt-4 mt-4 pb-6">
          <div className="w-[20%] md:w-[15%]">
            <img
              className="h-16 sm:h-24 md:h-32 mt-3 pl-6 md:pl-8 lg:pl-12"
              src={org_logo}
              alt=""
            />
          </div>
          <div className="flex flex-col pt-2 pl-2 md:pl-4 ">
            <h1 className="text-[#0f1035] md:pt-4 font-bold text-xl sm:text-2xl md:text-3xl flex">
              <LuTrophy className="mt-1 mr-1 md:mt-2  md:mr-2" /> GeekHaven Camp
            </h1>
            <p className="text-[16px] sm:text-xl md:text-2xl  md:pt-1 sm:pt-1">
              TechnoGeek Organisation, Allahabad
            </p>
            <p className="text-[16px] sm:text-xl md:text-2xl  md:pt-3 sm:pt-3 text-[#2A7805] flex font-semibold">
              <FaLocationDot className="mt-1 pr-1" /> Old Naini Bridge,
              Allahabad, India
            </p>
          </div>
        </div>
      </div>
      {/* main profile */}
      <div className="mt-4 rounded-lg backdrop-filter backdrop-blur-lg z-30 bg-opacity-30 bg-[#bebaba] border-t border-b border-[#8c858544] shadow-md w-full">
        <div className="bg-transparent flex-col w-full  items-center h-[160px] ">
          <div className="mt-4 flex justify-between w-full">
            <h1 className="ml-6 md:ml-10 lg:ml-10 font-bold text-xl sm:text-2xl md:text-3xl flex text-[#686968]">
              <SlCalender className="mr-2 md:mr-4 mt-1" />
              21st-23rd Jan’24
            </h1>
            <Link to='/org/verify'><button className="md:text-lg text-sm mx-3 px-3 py-1 md:ml-10 lg:mr-6 md:px-5 md:py-2 text-gray-100 rounded-lg bg-gradient-to-r from-[#353657] to-[#404162] hover:from-[#353657] hover:to-[#0F1035]">
              Verify
            </button></Link>
          </div>
          <div className="ml-6 lg:mx-24 mt-4 lg:mt-6 md:ml-10 grid grid-cols-2 md:grid-cols-3 gap-2">
            <div className="flex text-[#686968]">
              <IoIosPeople size={40} className="md:mr-4 mr-2" />
              <div className="text-md md:text-xl lg:text-2xl">
                <p className="font-bold">Registered</p>
                <p className="mt-[-4px] md:mt-[0]">235</p>
              </div>
            </div>

            <div className="flex text-[#686968]">
              <IoEyeSharp size={40} className="md:mr-4 mr-2" />
              <div className="text-md md:text-xl lg:text-2xl">
                <p className="font-bold">Impressions</p>
                <p className="mt-[-4px] md:mt-[0]">2135</p>
              </div>
            </div>

            <div className=" text-[#686968] hidden md:flex">
              <FaRegClock size={40} className="md:mr-4 mr-2" />
              <div className="text-md md:text-xl lg:text-[25px]">
                <p className="font-bold">Registration Deadline</p>
                <p className="mt-[-4px] lg:mt-1">25 days left</p>
              </div>
            </div>
          </div>
          <div className="ml-6 mt-2 text-[#686968] flex md:hidden">
            <FaRegClock size={35} className="md:mr-4 mr-2" />
            <div className="text-md md:text-xl">
              <p className="font-bold">Registration Deadline</p>
              <p className="mt-[-4px] md:mt-[0]">25 days left</p>
            </div>
          </div>
        </div>
      </div>
      {/* glass 1 ends */}
      <div className="overflow-y-scroll bg-cover bg-fixed bg-center bg-no-repeat bg-[url('./assets/images/Campbg.png')] pb-6  md:pb-12">
        <div className="flex ml-4 md:ml-10 lg:ml-10 font-bold text-xl sm:text-2xl md:text-3xl text-[#CD8521] mt-4">
          <h1>Participate and Earn :</h1>
          <p className="pl-2 lg:ml-4 md:ml-2 flex font-bold  text-[#FA9A0F]">
            <SiDogecoin className=" mr-1 mt-1 " /> 587
          </p>
        </div>
        {/* points */}
        <div className="mt-8 md:mt-12 mr-8 ml-8 pb-4 rounded-lg backdrop-filter text-[#686968] backdrop-blur-lg z-30 bg-opacity-30 bg-[#bebaba] border-t border-b border-[#8c858544] shadow-md ">
          <div className="ml-5 md:ml-10 w-fit  bg-transparent flex-col   items-center  ">
            <h1 className="mt-4 font-bold text-xl w-full sm:text-2xl md:text-3xl flex text-[#686968]">
              Our Goal
            </h1>
            <p className="md:text-xl text-md lg:text-2xl mt-4 lg:mt-6 ">
              The Guidelines Review Committee ensure that WHO guidelines are of
              a high methodological quality and are developed through a
              transparent, evidence.Guidelines are subject to a rigorous quality
              assurance process that helps to ensure that each and every
              published guideline is trustworthy, impactful and meets the
              highest international standards.
            </p>
          </div>
        </div>
        {/* goals */}
        <div className="mt-4 md:mt-8 mr-8 ml-8 pb-4 rounded-lg backdrop-filter text-[#686968] backdrop-blur-lg z-30 bg-opacity-30 bg-[#bebaba] border-t border-b border-[#8c858544] shadow-md ">
          <div className="ml-5 md:ml-10 w-fit  bg-transparent flex-col   items-center  ">
            <h1 className="mt-4 font-bold text-xl w-full sm:text-2xl md:text-3xl flex text-[#686968]">
              Guidlines
            </h1>
            <ul className="md:text-xl ml-10 text-md lg:text-2xl mt-4 lg:mt-6 list-disc">
              <li>
                No verbal communication during drawing sessions in Pictionary.
              </li>
              <li>Respectful conduct towards all participants.</li>
              <li>
                No verbal communication during drawing sessions in Pictionary.
              </li>
              <li>
                In case of any disputes or issues, the organizing committee<sup>'</sup>s
                decision will be considered final.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
};

export default OrgCampaignProfile;
