import React, { useEffect, useState } from "react";
import campaign from "../assets/images/campaign.png";
import { FaArrowRight } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { jwtDecode } from "jwt-decode";
import Aos from "aos";
import "aos/dist/aos.css";

export default function CreateCampaigns() {
    const [user, loading, error] = useAuthState(auth);
    let role;
    if (!loading) {
        const accessToken = user?.accessToken;
        if (accessToken) role = jwtDecode(user?.accessToken).role;
    }

    useEffect(() => {
        Aos.init();
        Aos.refresh();
    });

    return (
        <div className="w-full h-full bg-[#fbfbfa] justify-between mt-16 bg-opacity-0">
            <div className="w-full h-[90%] absolute z-0 mx-auto overflow-y-scroll bg-cover bg-fixed bg-center bg-no-repeat bg-[#277868]"></div>
            <div className="max-w-[1240px] mx-auto justify-center items-center relative z-2">
                {/* <h1 className="py-3 text-[#0F1035] text-4xl md:text-6xl text-center font-bold">
          About Us
        </h1> */}
                <div className="grid lg:grid-cols-2 px-2 py-16">
                    <div className="py-20">
                        <h1
                            data-aos="fade-up"
                            data-aos-duration="700"
                            className="text-[#dbdbdb] text-4xl md:text-6xl text-left font-bold"
                        >
                            CREATE
                        </h1>
                        <h1
                            data-aos="fade-up"
                            data-aos-duration="700"
                            className="text-[#dbdbdb] text-4xl md:text-6xl text-left font-bold"
                        >
                            CAMPAIGNS
                        </h1>
                        <p
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            className="mt-12 text-xl md:text-2xl text-[#dbdbdb] font-medium "
                        >
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
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            className="flex mt-8 py-2 px-6 text-center md:text-3xl bg-[#dbdbdb] border text-[#277868] hover:scale-110 duration-300 hover:shadow-xl rounded-md"
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
                            data-aos="fade-up"
                            data-aos-duration="1000"
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
