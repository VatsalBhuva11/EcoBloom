import React from "react";
import banner from "../assets/images/banner.png";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

export default function SignupInitial() {
    return (
        <div>
            <div className="absolute top-2 left-2">
                <img
                    className="h-28 cursor-pointer hover:scale-105 lg:duration-300"
                    onClick={() => {
                        window.location.href = "/";
                    }}
                    src={logo}
                    alt=""
                />
            </div>
            <div className="bg-[#fbfbfa] flex flex-col justify-center items-center p-11 h-screen">
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#277868] font-bold font-inter mb-10 ">
                    JOIN US AS AN
                </div>
                <img src={banner} alt="" className="hidden sm:flex w-[49%]" />
                <div className="flex flex-col md:gap-20 items-center sm:flex-row sm:items-center md:text-xl ">
                    <Link to="/signup/user">
                        <button className="bg-[#277868] text-[#dbdbdb] p-4 m-4 rounded-lg font-bold hover:scale-105 duration-300">
                            Individual
                        </button>
                    </Link>
                    <Link to="/signup/org">
                        <button className="bg-[#277868] text-[#dbdbdb] p-4 m-4 rounded-lg font-bold hover:scale-105 duration-300">
                            Organisation
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
