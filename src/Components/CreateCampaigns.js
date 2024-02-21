import React, { useState } from "react";
import campaign from "../assets/images/campaign.png";
import { FaArrowRight } from "react-icons/fa";
import { useScroll, motion } from "framer-motion";
import { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { jwtDecode } from "jwt-decode";

export default function CreateCampaigns() {
    //     const ref = useRef(null);
    //   const { scrollYProgress } = useScroll({ target: ref });
    //   const y = useParallax(scrollYProgress, 300);
    const [user, loading, error] = useAuthState(auth);
    let role;
    if (!loading) {
        const accessToken = user?.accessToken;
        if (accessToken) role = jwtDecode(user?.accessToken).role;
    }
    return (
        <div className="w-full h-full bg-[#EEF0E5] justify-between mt-16 bg-opacity-0">
            <div className="w-full h-[750px] absolute z-0 mx-auto overflow-y-scroll bg-cover bg-fixed bg-center bg-no-repeat bg-[url('./assets/images/beach_cleaning_edited.jpg')]"></div>
            <div className="max-w-[1240px] mx-auto justify-center items-center relative z-2">
                {/* <h1 className="py-3 text-[#0F1035] text-4xl md:text-6xl text-center font-bold">
          About Us
        </h1> */}
                <div className="grid lg:grid-cols-2 px-2 py-12">
                    <div className="">
                        <h1 className="text-[#1d1f5b] text-4xl md:text-6xl text-left font-bold">
                            CREATE
                        </h1>
                        <h1 className="text-[#010204] text-4xl md:text-6xl text-left font-bold">
                            CAMPAIGNS
                        </h1>
                        <p className="mt-12 text-xl md:text-2xl text-[#0F1035] font-medium ">
                            It doesn't matter if you're a grassroots initiative
                            or an established entity. EcoBloom is your canvas to
                            amplify your environmental impact. Join us in this
                            collaborative effort, where every small action
                            contributes to a cleaner planet.
                        </p>
                        <button
                            onClick={() => {
                                window.location.href =
                                    role === "org"
                                        ? "/campaign/create"
                                        : "/signup/org";
                            }}
                            className="flex mt-8 py-2 px-6 text-center md:text-3xl text-white border bg-[#0F1035] hover:bg-transparent hover:border-[#0F1035]  rounded-md"
                        >
                            Create Now
                            <FaArrowRight
                                className="hidden md:flex ml-4 mt-2 "
                                size={25}
                            />
                        </button>
                    </div>
                    <div className="hidden lg:block">
                        <img
                            src={campaign}
                            className="hidden lg:block ml-8 w-[40rem]"
                            alt="ecobloom"
                        />
                    </div>
                </div>
            </div>
            {/* <motion.h2 style={{ y }}></motion.h2> */}
        </div>
    );
}
