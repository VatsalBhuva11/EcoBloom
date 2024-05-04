import React, { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import p1 from "../assets/images/p1.png";
import p2 from "../assets/images/p2.png";
import p3 from "../assets/images/p3.png";
import p4 from "../assets/images/p4.png";
import p5 from "../assets/images/p5.png";
import p6 from "../assets/images/p6.png";
import Aos from "aos";
import "aos/dist/aos.css"

export default function PastCampaigns() {

    useEffect(()=>{
        Aos.init();
        Aos.refresh();
    },[])

    return (
        <div className="w-full bg-[#fbfbfa] justify-between pt-12">
            <div className="max-w-[95%] mx-auto flex flex-col justify-center items-center">
                <h1
                data-aos = "fade-up"
                data-aos-duration = "1500" 
                className=" text-[#277868] text-4xl md:text-6xl text-center font-bold pb-12">
                    PAST CAMPAIGNS
                </h1>
                <div className="container mx-auto px-5 lg:px-32">
                    <div className="-m-1 flex flex-wrap md:-m-2">
                        <div className="flex w-1/2 flex-wrap">
                            <div className="w-1/2 p-1 md:p-2">
                                <img
                                    alt="gallery"
                                    data-aos = "zoom-in"
                                    data-aos-duration = "1500"
                                    className="block h-full w-full rounded-lg object-cover cursor-pointer hover:scale-110 duration-300  object-center"
                                    src={p1}
                                />
                            </div>
                            <div className="w-1/2 p-1 md:p-2">
                                <img
                                    alt="gallery"
                                    data-aos = "zoom-in"
                                    data-aos-duration = "1500"
                                    className="block h-full w-full rounded-lg object-cover cursor-pointer hover:scale-110 duration-300 object-center"
                                    src={p2}
                                />
                            </div>
                            <div className="w-full p-1 md:p-2">
                                <img
                                    alt="gallery"
                                    data-aos = "zoom-in"
                                    data-aos-duration = "1500"
                                    className="block h-full w-full rounded-lg object-cover cursor-pointer hover:scale-110 duration-300  object-center"
                                    src={p3}
                                />
                            </div>
                        </div>
                        <div className="flex w-1/2 flex-wrap">
                            <div className="w-full p-1 md:p-2">
                                <img
                                    alt="gallery"
                                    data-aos = "zoom-in"
                                    data-aos-duration = "1500"
                                    className="block h-full w-full rounded-lg hover:scale-110 cursor-pointer duration-300 object-cover  object-center"
                                    src={p4}
                                />
                            </div>
                            <div className="w-1/2 p-1 md:p-2">
                                <img
                                    alt="gallery"
                                    data-aos = "zoom-in"
                                    data-aos-duration = "1500"
                                    className="block h-full w-full rounded-lg object-cover cursor-pointer hover:scale-110 duration-300  object-center"
                                    src={p5}
                                />
                            </div>
                            <div className="w-1/2 p-1 md:p-2">
                                <img
                                    alt="gallery"
                                    data-aos = "zoom-in"
                                    data-aos-duration = "1500"
                                    className="block h-full w-full rounded-lg object-cover cursor-pointer hover:scale-110 duration-300  object-center"
                                    src={p6}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <a href="https://www.instagram.com/eco_bloom_/" target="_blank">
                    <button 
                    data-aos = "fade-up"
                    data-aos-duration = "1500"
                    className="flex  justify-center items-center  mt-32 py-2 px-6 text-center md:text-3xl mb-10 text-[#dbdbdb] border bg-[#277868] hover:scale-110 duration-300 font-bold  hover:shadow-lg  rounded-md">
                        See More
                        <FaArrowRight
                            className="hidden md:flex ml-4 mt-2 "
                            size={25}
                        />
                    </button>
                </a>
            </div>
            {/* <motion.h2 style={{ y }}></motion.h2> */}
        </div>
    );
}