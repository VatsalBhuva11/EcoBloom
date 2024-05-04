import React, { useEffect } from "react";
import { IoIosPeople } from "react-icons/io";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.js";
import { jwtDecode } from "jwt-decode";
import Aos from "aos";
import "aos/dist/aos.css";

export default function JoinUs() {
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
        <div name="support" className="w-full">
            <div className="w-full h-[600px] absolute mx-auto overflow-y-scroll bg-cover bg-fixed bg-center bg-no-repeat bg-[url('./assets/images/joinUs.png')]">
                {/* <img className="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(77).webp""w-full h-full object-cover " src={joinUs} alt="" /> */}
            </div>
            <div className="max-w-[1240px] mx-auto relative">
                <div className="px-4 py-12 flex flex-col justify-center items-center">
                    <h2
                        data-aos="fade-up"
                        data-aos-duration="1500"
                        className=" z-2 text-[#0F1035] text-4xl md:text-6xl text-center font-bold"
                    >
                        JOIN US NOW
                    </h2>
                    <button
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        className=" flex  justify-center items-center git mt-32 py-2 px-6 text-center md:text-3xl mb-10 text-gray-100 border bg-[#0F1035] font-bold hover:bg-[#000000] hover:text-[#ffff] hover:shadow-lg hover:border-indigo-600 rounded-md"
                    >
                        <Link
                            to={
                                (!role && user) || role === "user"
                                    ? "/user/join"
                                    : "/signup/user"
                            }
                        >
                            <div
                                data-aos="fade-up"
                                data-aos-duration="1000"
                                className="flex justify-center items-center"
                            >
                                JOIN COMMUNITY{" "}
                                <IoIosPeople
                                    className="hidden md:flex ml-4 mt-1 "
                                    size={34}
                                />{" "}
                            </div>
                        </Link>
                    </button>
                </div>
            </div>
            {/* <motion.h2 style={{ y }}></motion.h2> */}
        </div>
    );
}
