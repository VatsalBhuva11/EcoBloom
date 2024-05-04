import React from "react";
import { FaArrowRightLong, FaLocationDot } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import campaignbanner from "../assets/images/campaignbanner.png";
import moment from "moment";

export default function PastCampaignsCards({ campaign }) {
  return (
    <div className="flex items-center justify-center">
      <div className="w-[21.5rem] lg:w-[24.5rem] bg-[#DFE4C5] flex flex-col justify-between rounded-lg h-72 lg:h-64">
        <div className="card">
          <div className="flex flex-col">
            <div className="w-[21.5rem] lg:w-[24.5rem] h-28 p-2 overflow-hidden">
              <img
                className="rounded-xl bg-cover"
                src={campaignbanner}
                alt=""
              />
            </div>
            <div className=" ml-4 ">
              <div className="text-lg lg:text-xl font-medium">
                {campaign.name}
              </div>
              <div className="text-xs">
                {campaign.registeredUsersCount} registered
              </div>
              <div className="flex items-center gap-1 text-[#2A7805] font-bold">
                <FaLocationDot />
                {campaign.city}, {campaign.country}
              </div>
              <div className="flex items-center gap-1 text-[#2A7805] text-sm">
                <SlCalender />
                {moment(campaign.startDate).format("lll")} -{" "}
                {moment(campaign.endDate).format("lll")}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end pr-3">
            <button
              onClick={() => {
                window.location.href = "/org/campaign/" + campaign._id;
              }}
              className="w-36 h-7 mt-4 text-[16px] text-[#fbfbfa] rounded-3xl bg-[#0F1035] hover:scale-105 duration-200 flex justify-center gap-1"
            >
              View Details
              <div className="text-md mt-[0.34rem]">
                <FaArrowRightLong />{" "}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
