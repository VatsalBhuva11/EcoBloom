import React from "react";
import { Link, Navigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { RxActivityLog } from "react-icons/rx";
import face from '../assets/images/face.jpg'

const New_User_Dashboard = () => {
  return (
    <div>
      <div className="w-full bg-[#0f1035] text-white flex justify-between ">
        <div className="flex items-center">
          <Link to="/">
            <img
              className="h-12  hover:scale-105 duration-300 md:h-16 mt-2"
              src={logo}
              alt=""
            />
          </Link>
          <div className="ml-5 xl:m-6 text-2xl font-bold hidden xl:flex">
            USER DASHBOARD
          </div>
          <a className="flex items-center sm:text-2xl md:text-3xl lg:text-3xl m-5 xl:m-8 sm:m-7 lg:m-6 gap-1 sm:gap-2 lg:gap-3 cursor-pointer ">
            <Link to="/log">
              <div className="flex items-center  hover:text-blue-400 text-[1.23rem] md:text-3xl lg:text-xl sm:flex">
                <div className="text-2xl text-white mr-2">
                  <RxActivityLog />
                </div>
                <div className="mb-2 hidden lg:flex mt-2">Activity Log</div>
              </div>{" "}
            </Link>
          </a>
        </div>
        <div className="flex justify-end items-center text-2xl sm:text-2xl md:text-3xl mr-1">
          <div className="flex mx-2 sm:mx-5 lg:mx-8 items-center">
            <Link to="/user/profile">
              <img
                className="w-[60px] h-[60px] mx-4 rounded-full hover:scale-110 cursor-pointer duration-300 my-1"
                src={face}
                alt=""
              />
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default New_User_Dashboard;
