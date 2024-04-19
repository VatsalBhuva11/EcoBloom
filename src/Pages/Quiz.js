import React from "react";
import React from "react";
import quiz_bg from "../assets/images/quiz_bg.jpg";
import question from "../assets/images/question.png";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
const Quiz = () => {
  return (
    <div className="bg-cover bg-fixed bg-center bg-no-repeat bg-[url('./assets/images/quiz_bg.jpg')] h-screen">
      <Link to="/">
        <img
          className="h-24 hover:scale-105 duration-300 mt-4"
          src={logo}
          alt=""
        />
      </Link>
      <div className="xl:flex mx-auto">
        <img
          className="hidden xl:flex mr-[-16rem] xl:w-44 ml-12 2xl:w-64 "
          src={question}
          alt=""
        />
        <div className="w-3/4 mx-auto mt-24 p-4  md:p-8 lg:p-12 rounded-3xl bg-gradient-to-l from-[#335252] via-[#335252] to-[#496E6E ]">
          <div className="text-[#c1c1c1] text-xl md:text-3xl lg:text-4xl xl:text-5xl   text-center ">
            Which of the following is a deciduous tree species?
          </div>
        </div>
      </div>
      <div className="w-3/4  mx-auto mt-24 px-4">
        <div className="flex gap-8 lg:gap-24 2xl:gap-48 xl:px-32 justify-between text-[#c1c1c1]">
          <button className="border-[1px] border-[#EECB46]  py-2 md:py-4 rounded-full w-1/2 text-2xl  hover:bg-[#335252]">
            A. Pine
          </button>
          <button className="border-[1px] border-[#EECB46]  py-2 md:py-4 rounded-full text-2xl w-1/2  hover:bg-[#335252]">
            B. Oak
          </button>
        </div>
        <div className="flex gap-8 lg:gap-24 2xl:gap-48 xl:px-32 justify-between text-[#c1c1c1] mt-8 2xl:mt-12 ">
          <button className="border-[1px] border-[#EECB46]  py-2 md:py-4 rounded-full w-1/2 text-2xl  hover:bg-[#335252] ">
            C. Cedar
          </button>
          <button className="border-[1px] border-[#EECB46]  py-2 md:py-4 rounded-full text-2xl w-1/2  hover:bg-[#335252]">
            D. Palm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
