import React from 'react'
import campaign from "../assets/images/campaign.png";
import { FaArrowRight } from "react-icons/fa";

export default function CreateCampaigns() {
  return (
    <div className="w-full h-full bg-[#EEF0E5] justify-between pt-32">
      <div className="max-w-[1240px] mx-auto justify-center items-center">
        {/* <h1 className="py-3 text-[#0F1035] text-4xl md:text-6xl text-center font-bold">
          About Us
        </h1> */}
        <div className="grid md:grid-cols-2 px-2 py-12">
          <div className="">
            <h1 className="text-[#1d1f5b] text-4xl md:text-6xl text-left font-bold">
              CREATE
            </h1>
            <h1 className="text-[#010204] text-4xl md:text-6xl text-left font-bold">
              CAMPAIGN
            </h1>
            <p className="mt-12 text-xl md:text-2xl text-[#0F1035] font-medium ">
              It doesn't matter if you're a grassroots initiative or an
              established entity. EcoBloom is your canvas to amplify your
              environmental impact. Join us in this collaborative effort, where
              every small action contributes to a cleaner planet.
            </p>
            <button className="flex mt-8 py-2 px-6 text-center md:text-3xl text-white border bg-[#0F1035] hover:font-bold hover:bg-transparent hover:border-[#0F1035] hover:text-[#0F1035] rounded-md">
              Create Now
              <FaArrowRight className="hidden md:flex ml-4 mt-2 " size={25} />
            </button>
          </div>
          <div>
            <img
              src={campaign}
              className="hidden md:block ml-8 w-[40rem]"
              alt="ecobloom"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
