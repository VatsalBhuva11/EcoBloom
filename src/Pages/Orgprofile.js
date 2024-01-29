import React from "react";
import { useState } from "react";
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
import { FaPlus , FaArrowRightLong} from "react-icons/fa6";
import PastCampaignsCards from "../Components/PastCampaignsCards";
import { Link } from "react-router-dom";
import arrow from '../assets/images/arrow.png'
import Community_Joined_Card from "./Community_Joined_Card";

const Orgprofile = () => {

  const [showMyModel, setShowMyModal] = useState(false);
  const handleOnClose = () => setShowMyModal(false);

  const [status, setStatus] = useState("about");
  const [ifBold1, setIfBold1] = useState("bold");
  const [ifBold2, setIfBold2] = useState("normal");
  const [ifBold3, setIfBold3] = useState("normal");


  const handleABoutChange = () => {
    setIfBold1("bold");
    setIfBold2("normal")
    setIfBold3("normal")
    //console.log("about")
    setStatus("about")
  }

  const handlePastChange = () => {
    setIfBold1("normal");
    setIfBold2("normal")
    setIfBold3("bold")
    //console.log("people")
    setStatus("people")
  }

  const handlePostChange = () => {
    setIfBold1("normal");
    setIfBold2("bold")
    setIfBold3("normal")
    console.log("post page")
    setStatus("post")
  }

    return (
        <div className="flex">
            <div className=" flex flex-col w-full  lg:w-[75%]">
                {/* navbar */}
                <div className="w-full bg-[#0f1035]  text-gray-200 flex shadow-2xl h-[10%] ">
                    <div className="flex items-center ">
                        <Link to='/user/dashboard'><img className="h-12 md:h-16 mt-2" src={logo} alt="" /></Link>
                        <input
                            type="search"
                            id="default-search"
                            class=" md:ml-2 py-1 px-2 text-md lg:text-xl text-gray-200 rounded-lg bg-[#353657] focus:ring-white focus:border-white w-[250px] md:w-[450px]"
                            placeholder="search"
                        />
                    </div>
                </div>
                {/* navbar */}
                <div className="w-full h-full bg-[#EEF0E5]">
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
                  GeekHaven, IIIT Allahabad
                </h1>
                <p className="text-[14px] sm:text-lg md:text-2xl pt-1 sm:pt-3">
                  The Technical Club Information Technology, Allahabad
                </p>
                <p className="text-[14px] sm:text-lg md:text-xl pt-1 sm:pt-1">
                  Allahabad, Uttar Pradesh 2K Members
                </p>
                <div className="flex pt-3 md:pt-6  gap-3 sm:gap-4 md:gap-6 ">
                  <Link to="/chat">
                    <button className="border-solid border-2 border-[#0f1035] hover:scale-105 duration-300 bg-transparent  flex text-[#0f1035] rounded-3xl py-1 px-3 sm:py-1.5 sm:px-4 text-md sm:text-lg md:text-xl sm:gap-1 md:gap-2 font-semibold ">
                      <IoIosSend className="sm:flex hidden" size={30} />{" "}
                      Community Chat
                    </button>
                  </Link>
                  <button onClick={() => setShowMyModal(true)} className="bg-[#0f1035] flex hover:scale-105 duration-300 text-gray-200 rounded-3xl py-1 px-3 sm:py-1.5 sm:px-6 text-md sm:text-lg md:text-xl sm:gap-3 md:gap-4 font-semibold">
                    <FaPlus className="pt-1 sm:flex hidden" size={28} /> Join Community
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-2  ml-6  pr-2">
              <div className={`flex gap-6 sm:gap-10 md:gap-12 pb-2`}>
                <button onClick={handleABoutChange} ><p className={`text-md sm:text-lg md:text-xl cursor-pointer font-${ifBold1}`}  >ABOUT</p></button>
                <button onClick={handlePostChange} ><p className={`text-md sm:text-lg md:text-xl cursor-pointer font-${ifBold2}`}  >POSTS</p></button>
                <button onClick={handlePastChange} ><p className={`text-md sm:text-lg md:text-xl cursor-pointer font-${ifBold3}`}  >PAST CAMPAIGNS</p></button>
              </div>
            </div>
          </div>
          {status === "about" ? (
            <div>
              <div className="text-center lg:text-2xl text-lg font-semibold mt-5">ABOUT US</div>
              <div className="mt-4 lg:text-lg text-sm ml-2 font-medium p-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum aspernatur ex neque aliquid quis? Officiis deleniti necessitatibus vitae, earum magni voluptates dolores vel corrupti assumenda nemo qui iusto nobis. Corporis eius maiores consequuntur obcaecati iste a ullam aut, doloremque porro? Veniam cum laudantium excepturi, voluptatem voluptatibus dolorem rerum voluptatum laborum vero sunt libero, vitae hic, nihil a suscipit nisi. Accusamus rem placeat earum libero ullam suscipit a officiis ut sint. Et ab neque, id quis laudantium similique! Vel, sit.</div>

            </div>
          ) : status === "post" ? (
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
          ) : (
            <div className="grid grid-cols-2 gap-5 p-8">
              <PastCampaignsCards/>
              <PastCampaignsCards/>
              <PastCampaignsCards/>
              <PastCampaignsCards/>
              <PastCampaignsCards/>
            </div>
          )}


        </div>
      </div>
            {/* user profile ends */}
            <div className="hidden lg:flex lg:flex-col lg:w-[25%]">
        <div className="w-full h-screen fixed bg-[#0f1035] text-gray-200 shadow-3xl ">
          {/* search bar */}

         
          <div className="justify-center items-center mt-10 md:ml-4 lg:ml-14">
          </div>
          <div className="">
            <div className="flex items-center cursor-pointer ml-2">
              <div className="text-[#eef0e5] lg:text-2xl tex-xl md:mt-4 lg:mt-6  font-semibold">
                Ongoing Campaign
              </div>
              <img className='w-[15px] h-[25px] xl:w-[20px] xl:h-[30px] lg:mt-8 lg:ml-5 mt-5 ml-4 rounded-full' src={arrow} alt="altt" />
            </div>
            <div className='flex flex-col gap-4 xl:gap-5 mt-5' >
              <a href="">
                <div className='flex pb-3 items-center  border-b-2 lg:gap-3 xl:gap-7 px-2 '>
                  <div className="font-bold">24 AUG'23</div>
                  <div className='flex flex-col'><p className='text-[#eef0e5] text-[1rem] xl:text-[18px] mt-1 lg:mt-0'>Environment Helpers</p>
                    <p className='text-[#eef0e5] text-[0.75rem]'>345 people attended</p></div>
                </div>
              </a>
            </div>
          </div>
          <div className="mt-10 h-[50%] ">
            <div className="flex items-center cursor-pointer ml-2">
              <div className="text-[#eef0e5] lg:text-2xl tex-xl md:mt-4 lg:mt-6  font-semibold">
                Upcoming Campaigns
              </div>
              <img className='w-[15px] h-[25px] xl:w-[20px] xl:h-[30px] lg:mt-8 lg:ml-5 mt-5 ml-4 rounded-full' src={arrow} alt="altt" />
            </div>
            <div className='flex flex-col gap-4 xl:gap-5 mt-5 ' >
              <a href="">
                <div className='flex pb-3 items-center  border-b-2 lg:gap-3 xl:gap-7 px-2 '>
                  <div className="font-bold">24 AUG'23</div>
                  <div className='flex flex-col'><p className='text-[#eef0e5] text-[1rem] xl:text-[18px] mt-1 lg:mt-0'>Environment Helpers</p>
                    <p className='text-[#eef0e5] text-[0.75rem]'>345 people attended</p></div>
                </div>
              </a>
              <a href="">
                <div className='flex pb-3 items-center  border-b-2 lg:gap-3 xl:gap-7 px-2 '>
                  <div className="font-bold">24 AUG'23</div>
                  <div className='flex flex-col'><p className='text-[#eef0e5] text-[1rem] xl:text-[18px] mt-1 lg:mt-0'>Environment Helpers</p>
                    <p className='text-[#eef0e5] text-[0.75rem]'>345 people attended</p></div>
                </div>
              </a>
              <a href="">
                <div className='flex pb-3 items-center  border-b-2 lg:gap-3 xl:gap-7 px-2 '>
                  <div className="font-bold">24 AUG'23</div>
                  <div className='flex flex-col'><p className='text-[#eef0e5] text-[1rem] xl:text-[18px] mt-1 lg:mt-0'>Environment Helpers</p>
                    <p className='text-[#eef0e5] text-[0.75rem]'>345 people attended</p></div>
                </div>
              </a>
              <a href="">
                <div className='flex pb-3 items-center  border-b-2 lg:gap-3 xl:gap-7 px-2 '>
                  <div className="font-bold">24 AUG'23</div>
                  <div className='flex flex-col'><p className='text-[#eef0e5] text-[1rem] xl:text-[18px] mt-1 lg:mt-0'>Environment Helpers</p>
                    <p className='text-[#eef0e5] text-[0.75rem]'>345 people attended</p></div>
                </div>
              </a>
             

            </div>
            <div className="flex p-8 ml-10">
                <button className=" font-bold flex items-center p-2 rounded-lg border-2 border-b-gray-300"> 
                View All 
                <div className="ml-2">
                  <FaArrowRightLong/>
                  </div> 
                  </button>
              </div>

          </div>



        </div>
      </div>
      <Community_Joined_Card onClose={handleOnClose} visible={showMyModel}/>
    </div>
    );
};

export default Orgprofile;
