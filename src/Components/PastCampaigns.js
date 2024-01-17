import React from "react";
import { FaArrowRight } from "react-icons/fa";
import p1 from "../assets/images/p1.png";
import p2 from "../assets/images/p2.png";
import p3 from "../assets/images/p3.png";
import p4 from "../assets/images/p4.png";
import p5 from "../assets/images/p5.png";
import p6 from "../assets/images/p6.png";

export default function PastCampaigns() {
  return (
    <div className="w-full h-full bg-[#EEF0E5] justify-between pt-12">
      <div className="max-w-[1240px] mx-auto justify-center items-center flex flex-col">
        <h1 className=" text-[#0F1035] text-4xl md:text-6xl text-center font-bold">
          PAST CAMPAIGNS
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-16">
          <div>
            <img className="h-auto max-w-full" src={p1} alt="" />
          </div>
          <div>
            <img className="h-auto max-w-full" src={p2} alt="" />
          </div>
          <div>
            <img className="h-auto max-w-full" src={p3} alt="" />
          </div>
          <div>
            <img className="h-auto max-w-full" src={p4} alt="" />
          </div>
          <div>
            <img className="h-auto max-w-full" src={p5} alt="" />
          </div>
          <div>
            <img className="h-auto max-w-full" src={p6} alt="" />
          </div>
        </div>
        <button className="flex mt-8 py-2 px-6 mb-10 text-center md:text-3xl text-white border bg-[#0F1035] hover:font-bold hover:bg-transparent hover:border-[#0F1035] hover:text-[#0F1035] rounded-md">
          See More{" "}
          <FaArrowRight className="hidden md:flex ml-4 mt-2 " size={25} />
        </button>
      </div>
    </div>
  );
}
