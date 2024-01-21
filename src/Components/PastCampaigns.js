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
        <div className="w-full bg-[#EEF0E5] justify-between pt-12">
            <div className="max-w-[95%] mx-auto flex flex-col justify-center items-center">
                <h1 className=" text-[#0F1035] text-4xl md:text-6xl text-center font-bold pb-12">
                    PAST CAMPAIGNS
                </h1>
                <div class="container mx-auto px-5 lg:px-32">
                    <div class="-m-1 flex flex-wrap md:-m-2">
                        <div class="flex w-1/2 flex-wrap">
                            <div class="w-1/2 p-1 md:p-2">
                                <img
                                    alt="gallery"
                                    class="block h-full w-full rounded-lg object-cover object-center"
                                    src={p1}
                                />
                            </div>
                            <div class="w-1/2 p-1 md:p-2">
                                <img
                                    alt="gallery"
                                    class="block h-full w-full rounded-lg object-cover object-center"
                                    src={p2}
                                />
                            </div>
                            <div class="w-full p-1 md:p-2">
                                <img
                                    alt="gallery"
                                    class="block h-full w-full rounded-lg object-cover object-center"
                                    src={p3}
                                />
                            </div>
                        </div>
                        <div class="flex w-1/2 flex-wrap">
                            <div class="w-full p-1 md:p-2">
                                <img
                                    alt="gallery"
                                    class="block h-full w-full rounded-lg object-cover object-center"
                                    src={p4}
                                />
                            </div>
                            <div class="w-1/2 p-1 md:p-2">
                                <img
                                    alt="gallery"
                                    class="block h-full w-full rounded-lg object-cover object-center"
                                    src={p5}
                                />
                            </div>
                            <div class="w-1/2 p-1 md:p-2">
                                <img
                                    alt="gallery"
                                    class="block h-full w-full rounded-lg object-cover object-center"
                                    src={p6}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <button className="flex  mt-8 py-2 px-6 mb-10 text-center md:text-3xl text-white border bg-[#0F1035] hover:font-bold hover:bg-transparent hover:border-[#0F1035] hover:text-[#0F1035] rounded-md">
                    See More{" "}
                    <FaArrowRight
                        className="hidden md:flex ml-4 mt-2 "
                        size={25}
                    />
                </button>
            </div>
        </div>
    );
}
