import React from "react";
// import { Link, Navigate } from "react-router-dom";
import logo from "../assets/images/logo_new.png";
import { RxActivityLog } from "react-icons/rx";
import face from "../assets/images/face.jpg";
import map from "../assets/images/map_img.png";
import { FaArrowRight } from "react-icons/fa6";
import quiz from "../assets/images/Quiz_logo.png";
import store from "../assets/images/Store_logo.png";
import chat from "../assets/images/chat_logo.png";
import User_Dash2 from "./User_Dash2";
import User_dash3 from "./User_dash3";

const New_User_Dashboard = () => {
  return (
    <div>
      <div className="h-screen bg-[#277868]">
        <div className="w-full bg-[#277868] text-white flex justify-between h-[10%] shadow-2xl mb-2">
          <div className="flex items-center justify-center">
            {/* <Link> */}
            <img
              className="hover:scale-105 duration-300 md:h-14 ml-2"
              src={logo}
              alt=""
            />
            {/* </Link> */}
            <div className="ml-5 xl:m-6 text-2xl font-bold hidden xl:flex">
              USER DASHBOARD
            </div>
            <a className="flex items-center sm:text-2xl md:text-3xl lg:text-3xl mx-5 xl:mx-8 sm:mx-7 lg:mx-6 gap-1 sm:gap-2 lg:gap-3 cursor-pointer">
              {/* <Link to="/log"> */}
              <div className="flex items-center  hover:text-blue-400 text-[1.23rem] md:text-3xl lg:text-xl sm:flex">
                <div className="text-2xl text-white mr-2">
                  <RxActivityLog />
                </div>
                <div className="mb-2 hidden lg:flex mt-2">Activity Log</div>
              </div>{" "}
              {/* </Link> */}
            </a>
          </div>
          <div className="flex justify-end items-center text-2xl sm:text-2xl md:text-3xl mr-1">
            <div className="flex mx-3 sm:mx-4 lg:mx-6 items-center">
              {/* <Link to="/user/profile"> */}
              <img
                className="w-[60px] h-[60px] rounded-full hover:scale-110 cursor-pointer duration-300 my-1"
                src={face}
                alt=""
              />
              {/* </Link> */}
            </div>
          </div>
        </div>
        <div className="flex w-full h-[88%]">
          <div className="h-full ml-1 overflow-hidden w-[75%]">
            <img src={map} className="overflow-hidden bg-cover h-full" />
          </div>
          <div className="h-full w-[25%] flex flex-col justify-around">
            <div className="m-1 h-[33%] bg-gradient-to-br from-[#407D71] to-[#064236] rounded-lg flex">
              <div className="w-[50%] h-full ml-3 flex flex-col justify-center gap-4">
                <div className=" flex flex-col">
                  <p className="text-3xl text-[#EADBDB] font-semibold">
                    ANSWER
                  </p>
                  <p className="text-3xl text-[#EADBDB] font-semibold">
                    & EARN
                  </p>
                  <p className="text-md text-[#68E665]">DAILY CHALLENGE</p>
                </div>
                <button className="bg-[#244942] rounded-3xl w-[70%]">
                  <div className="flex items-center justify-center text-[#D7D7D7] text-[1.1rem]">
                    <div className="">QUIZ</div>
                    <div className="">
                      <FaArrowRight />
                    </div>
                  </div>
                </button>
              </div>
              <div className="w-[60%] h-full flex justify-between items-center">
                <img src={quiz} className="" />
              </div>
            </div>
            <div className="m-1 h-[33%] bg-gradient-to-br from-[#407D71] to-[#064236] rounded-lg flex">
              <div className="w-[50%] h-full ml-3 flex flex-col justify-center gap-4">
                <div className=" flex flex-col">
                  <p className="text-3xl text-[#EADBDB] font-semibold">
                    EXPLORE
                  </p>
                  <p className="text-3xl text-[#EADBDB] font-semibold">
                    OUR STORE
                  </p>
                  <p className="text-md text-[#68E665]">12 ITEMS</p>
                </div>
                <button className="bg-[#244942] rounded-3xl w-[70%]">
                  <div className="flex items-center justify-center text-[#D7D7D7] text-[1.1rem]">
                    <div className="">STORE</div>
                    <div className="">
                      <FaArrowRight />
                    </div>
                  </div>
                </button>
              </div>
              <div className="w-[60%] h-full flex justify-between items-center ">
                <img src={store} className="" />
              </div>
            </div>
            <div className="m-1 h-[33%] bg-gradient-to-br from-[#407D71] to-[#064236] rounded-lg flex">
              <div className="w-[50%] h-full ml-3 flex flex-col justify-center gap-4">
                <div className=" flex flex-col">
                  <p className="text-3xl text-[#EADBDB] font-semibold">
                    CHAT WITH
                  </p>
                  <p className="text-3xl text-[#EADBDB] font-semibold">
                    OTHERS
                  </p>
                  <p className="text-md text-[#68E665]">256 USERS ONLINE</p>
                </div>
                <button className="bg-[#244942] rounded-3xl w-[70%]">
                  <div className="flex items-center justify-center text-[#D7D7D7] text-[1.1rem]">
                    <div className="">QUIZ</div>
                    <div className="">
                      <FaArrowRight />
                    </div>
                  </div>
                </button>
              </div>
              <div className="w-[60%] h-full flex justify-between items-center ">
                <img src={chat} className="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <User_Dash2 />
      <User_dash3/>
    </div>
  );
};

export default New_User_Dashboard;
