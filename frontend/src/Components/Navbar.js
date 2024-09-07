import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";
// import {motion} from "framer-motion"

const Navbar = () => {
    const [nav, setNav] = useState(true);
    const [role, setRole] = useState("");
    const [user, loading, error] = useAuthState(auth);

    const handleNav = () => {
        setNav(!nav);
    };

    useEffect(() => {
        if (!loading && user) {
            auth.currentUser.getIdTokenResult().then((idTokenResult) => {
                setRole(idTokenResult.claims.role);
            });
        } else {
            setRole("");
        }
    }, [user, loading]);

    return (
        <div className="flex justify-center">
            {/* <motion.div className="fixed left-0 right-0 h-[5px] bg-[#304d30] top-[7px] " style={{ scaleX }} /> */}
            {/* <motion.div className="fixed left-0 right-0 h-[5px] bg-[#304d30] top-[94px] " style={{ scaleX }} /> */}
            <div className="m-15 top-3 rounded-lg fixed backdrop-filter backdrop-blur-lg z-30 bg-opacity-30 bg-[#151414] border-t border-b border-[#b4b4b444] w-11/12">
                <div className="bg-transparent flex justify-between text-white  w-full  mx-auto items-center h-20 ">
                    <img className="h-28 mt-6" src={logo} alt="" />

                    <ul className="hidden md:flex md:items-center">
                        <a
                            className="text-white font-bold lg:text-[23px] md:text-[20px] lg:mx-6 md:mx-2"
                            href="#home"
                        >
                            Home
                        </a>
                        <a
                            className="text-white font-bold lg:text-[23px] md:text-[20px] lg:mx-6 md:mx-1"
                            href="#about"
                        >
                            About
                        </a>
                        {auth.currentUser && role === "user" ? (
                            <Link
                                to="/store"
                                className="text-white font-bold lg:text-[23px] md:text-[20px] lg:mx-6 md:mx-1"
                            >
                                Store
                            </Link>
                        ) : null}

                        <Link
                            to={
                                role === "user"
                                    ? "/user/dashboard"
                                    : role === "org"
                                    ? "/org/dashboard"
                                    : "/login"
                            }
                        >
                            <button className="bg-green-500 lg:text-[17px] md:text-[14px] lg:ml-6 lg:mr-4 md:ml-3 md:mr-2 font-bold border  border-white px-7 py-2 mb-0 rounded-lg">
                                {role === "user" || role === "org"
                                    ? "Dashboard"
                                    : "Login"}
                            </button>
                        </Link>
                        {role === "user" || role === "org" ? (
                            <button
                                onClick={() => {
                                    signOut(auth);
                                    localStorage.removeItem("profile");
                                }}
                                className="lg:text-[17px] md:text-[14px] font-bold lg:ml-4 md:ml-2 border border-white px-6 py-2 mb-0 rounded-lg lg:mr-12 md:mr-3 bg-red-500"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link to="/signup">
                                <button className="bg-green-500 lg:text-[17px] md:text-[14px] font-bold lg:ml-4 md:ml-2 border border-white px-6 py-2 mb-0 rounded-lg lg:mr-12 md:mr-6">
                                    Sign Up
                                </button>
                            </Link>
                        )}
                    </ul>
                    <div onClick={handleNav} className="block md:hidden mx-10">
                        {!nav ? (
                            <AiOutlineClose size={30} />
                        ) : (
                            <AiOutlineMenu size={30} />
                        )}
                    </div>
                    <div
                        className={
                            !nav
                                ? "absolute z-50 left-0 top-0 w-[60%] h-full ease-in-out duration-500 md:hidden rounded-lg"
                                : "fixed left-[-200%] md:hidden"
                        }
                    >
                        <div className=" uppercase grid grid-cols-1 text-[18px] rounded-lg backdrop-filter backdrop-blur-2xl bg-opacity-50 bg-[#030303]">
                            <a
                                className="p-4 border-b border-gray-100 cursor-pointer"
                                href="#home"
                                onClick={handleNav}
                            >
                                Home
                            </a>
                            <a
                                className="p-4 border-b border-gray-100 cursor-pointer"
                                href="#about"
                                onClick={handleNav}
                            >
                                About
                            </a>
                            <Link
                                to="/store"
                                className="p-4 border-b border-gray-100 "
                                onClick={handleNav}
                            >
                                Store
                            </Link>
                            <Link
                                to={
                                    role === "user"
                                        ? "/user/dashboard"
                                        : role === "org"
                                        ? "/org/dashboard"
                                        : "/login"
                                }
                                className="p-4 border-b border-gray-100"
                                onClick={handleNav}
                            >
                                {role === "user" || role === "org"
                                    ? "Dashboard"
                                    : "Login"}
                            </Link>
                            {role === "user" || role === "org" ? (
                                <button
                                    onClick={() => {
                                        signOut(auth);
                                        localStorage.removeItem("profile");
                                    }}
                                    className="p-4 bg-red-500 rounded-b-lg"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link
                                    to="/signup"
                                    className="p-4 bg-green-400 rounded-b-lg flex justify-center items-center"
                                >
                                    Sign Up
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
