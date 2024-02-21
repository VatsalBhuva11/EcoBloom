import React from "react";
import logo from "../assets/images/logo.png";
import pdf from "../assets/images/pdf.png";
import { FaRegFilePdf } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Admin = () => {
  return (
    <div className="bg-[#eef0e5] h-full flex flex-col ">
      <div className="flex items-center pt-3 md:pt-6">
        <Link to="/">
          <img
            className="h-16 hover:scale-105 duration-300 mt-4 ml-4 sm:ml-8 md:ml-12"
            src={logo}
            alt=""
          />
        </Link>
        <p className="text-lg sm:text-2xl md:text-3xl font-bold text-[#191B58] pt-2">
          VERIFY ORGANIZATION
        </p>
      </div>

      <div className="flex items-center justify-center">
        <div className="flex justify-center items-center rounded-3xl px-2 py-1 sm:p-2 md:p-4 bg-gradient-to-r from-[#353657] to-[#404162] w-3/4 mt-4 md:mt-8">
          <div className="w-full text-gray-100 border-r-2 border-b-gray-100 p-2 md:text-[20px] sm:text-[15px] text-[10px]">
            <div className="flex justify-center">
              <p>Accepted: </p>
              <p className="pl-2 text-[#EAC5C5]">1.1K</p>
            </div>
          </div>
          <div className="w-full text-gray-100 border-r-2 border-b-gray-100 p-2 md:text-[20px] sm:text-[15px] text-[10px]">
            <div className="flex justify-center">
              <p>Rejected: </p>
              <p className="pl-2 text-[#EAC5C5]">1.1K</p>
            </div>
          </div>
          <div className="w-full text-gray-100 border-b-gray-100 p-2  md:text-[20px] sm:text-[15px] text-[10px]">
            <div className="flex justify-center">
              <p>Unreviewed: </p>
              <p className="pl-2 text-[#EAC5C5]">1.1K</p>
            </div>
          </div>
        </div>
      </div>

      {/* 
      search */}
      <div className="mx-8 my-3 mt-8 flex justify-center items-center">
        <input
          type="text"
          className="h-10 w-full rounded-2xl px-4"
          placeholder="🔍 Search For Communities"
        />
      </div>
      <div className="flex items-center justify-center font-semibold ">
        <div className="flex justify-center items-center rounded-xl p-1 md:p-2 bg-gradient-to-r from-[#353657] to-[#404162] w-11/12 mt-2 md:mt-2">
          <div className="w-full text-gray-100 border-r-2 border-b-gray-700 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
            <div className="flex justify-center">
              <p>Name </p>
            </div>
          </div>
          <div className="w-full text-gray-100 border-r-2 border-b-gray-700 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
            <div className="flex justify-center">
              <p>Apply Date </p>
            </div>
          </div>
          <div className="w-full text-gray-100 border-r-2 border-b-gray-700 p-2  md:text-[20px] sm:text-[15px] text-[13px]">
            <div className="flex justify-center">
              <p>Information </p>
            </div>
          </div>
          <div className="w-full text-gray-100  border-b-gray-700 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
            <div className="flex justify-center">
              <p>Status </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center  ">
        <div className="flex justify-center items-center rounded-xl p-1 md:p-2 bg-[#E4E8D3] w-11/12 mt-3 md:mt-4">
          <div className="w-full text-gray-700 border-r-2 border-gray-500 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
            <div className="flex justify-center">
              <p className="font-semibold">GeekHaven </p>
            </div>
          </div>
          <div className="w-full text-gray-700 border-r-2 border-gray-500 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
            <div className="flex justify-center">
              <p>12 Jan, 2024</p>
            </div>
          </div>
          <div className="w-full flex justify-center text-gray-700 border-r-2 border-gray-500 p-2  text-2xl sm:text-3xl">
            <FaRegFilePdf />
          </div>
          <div className="w-full flex justify-center text-gray-700 p-2  md:text-[20px] sm:text-[15px] text-[13px]">
            <button className="hover:scale-105 duration-300  bg-[#6BBE7D] text-[#edede3] w-32 h-8 rounded-2xl  font-medium text-[14px]">
              VERIFIED
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center  ">
        <div className="flex justify-center items-center rounded-xl p-1 md:p-2 bg-[#E4E8D3] w-11/12 mt-3 md:mt-4">
          <div className="w-full text-gray-700 border-r-2 border-gray-500 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
            <div className="flex justify-center">
              <p className="font-semibold">GeekHaven </p>
            </div>
          </div>
          <div className="w-full text-gray-700 border-r-2 border-gray-500 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
            <div className="flex justify-center">
              <p>12 Jan, 2024</p>
            </div>
          </div>
          <div className="w-full flex justify-center text-gray-700 border-r-2 border-gray-500 p-2  text-2xl sm:text-3xl">
            <FaRegFilePdf />
          </div>
          <div className="w-full flex justify-center text-gray-700 p-2  md:text-[20px] sm:text-[15px] text-[13px]">
            <button className="hover:scale-105 duration-300 bg-[#6BBE7D] text-[#edede3] w-32 h-8 rounded-2xl  font-medium text-[14px]">
              VERIFIED
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center  ">
        <div className="flex justify-center items-center rounded-xl p-1 md:p-2 bg-[#E4E8D3] w-11/12 mt-3 md:mt-4">
          <div className="w-full text-gray-700 border-r-2 border-gray-500 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
            <div className="flex justify-center">
              <p className="font-semibold">GeekHaven </p>
            </div>
          </div>
          <div className="w-full text-gray-700 border-r-2 border-gray-500 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
            <div className="flex justify-center">
              <p>12 Jan, 2024</p>
            </div>
          </div>
          <div className="w-full flex justify-center text-gray-700 border-r-2 border-gray-500 p-2  text-2xl sm:text-3xl">
            <FaRegFilePdf />
          </div>
          <div className="w-full flex justify-center text-gray-700 p-2  md:text-[20px] sm:text-[15px] text-[13px]">
            <button className="hover:scale-105 duration-300  bg-[#6BBE7D] text-[#edede3] w-32 h-8 rounded-2xl  font-medium text-[14px]">
              VERIFIED
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center  ">
        <div className="flex justify-center items-center rounded-xl p-1 md:p-2 bg-[#E4E8D3] w-11/12 mt-3 md:mt-4">
          <div className="w-full text-gray-700 border-r-2 border-gray-500 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
            <div className="flex justify-center">
              <p className="font-semibold">GeekHaven </p>
            </div>
          </div>
          <div className="w-full text-gray-700 border-r-2 border-gray-500 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
            <div className="flex justify-center">
              <p>12 Jan, 2024</p>
            </div>
          </div>
          <div className="w-full flex justify-center text-gray-700 border-r-2 border-gray-500 p-2  text-2xl sm:text-3xl">
            <FaRegFilePdf />
          </div>
          <div className="w-full flex justify-center text-gray-700 p-2  md:text-[20px] sm:text-[15px] text-[13px]">
            <button className="hover:scale-105 duration-300  bg-[#BEBA6B] text-[#edede3] w-32 h-8 rounded-2xl  font-medium text-[14px]">
              REVIEW
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center  ">
        <div className="flex justify-center items-center rounded-xl p-1 md:p-2 bg-[#E4E8D3] w-11/12 mt-3 md:mt-4">
          <div className="w-full text-gray-700 border-r-2 border-gray-500 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
            <div className="flex justify-center">
              <p className="font-semibold">GeekHaven </p>
            </div>
          </div>
          <div className="w-full text-gray-700 border-r-2 border-gray-500 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
            <div className="flex justify-center">
              <p>12 Jan, 2024</p>
            </div>
          </div>
          <div className="w-full flex justify-center text-gray-700 border-r-2 border-gray-500 p-2  text-2xl sm:text-3xl">
            <FaRegFilePdf />
          </div>
          <div className="w-full flex justify-center text-gray-700 p-2  md:text-[20px] sm:text-[15px] text-[13px]">
            <button className="bg-[#BE7F6B] hover:scale-105 duration-300   text-[#edede3] w-32 h-8 rounded-2xl  font-medium text-[14px]">
              REJECTED
            </button>
          </div>
        </div>
      </div>

      {/* .. */}
    </div>
  );
};

export default Admin;
