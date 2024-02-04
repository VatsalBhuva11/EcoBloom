import React from "react";
import logo from "../assets/images/logo.png";
import shirt from "../assets/images/shirt.png";
import bag from "../assets/images/bag.png";
import cap from "../assets/images/cap (2).png";
import hoodie from "../assets/images/hoodie.png";
import keychain from "../assets/images/keychain (2).png";
import book from "../assets/images/book.png";
import { Link } from "react-router-dom";
const Delhivery = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const item = params.get("item");
    return (
        <div className=" h-screen ">
            <div className="flex bg-gray-200 shadow-xl">
                <Link to="/">
                    <img
                        className="h-16 hover:scale-105 duration-300 mt-4 ml-4 sm:ml-8 md:ml-12"
                        src={logo}
                        alt=""
                    />
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold mt-7 md:mt-6 text-[#444743]">
                    CHECKOUT
                </h1>
            </div>
            <div className="grid sm:grid-cols-2 grid-cols-1 mt-4">
                {/* 1st section */}

                <div className=" hidden sm:flex mb-60 mx-auto">
                    <div class="bg-[#e9e6e0]  border-indigo-600 mt-8  rounded-lg shadow-2xl flex flex-col align-middle">
                        <div>
                            {item === "tshirt" ? (
                                <img src={shirt} className="p-2" alt="tshirt" />
                            ) : item === "cap" ? (
                                <img src={cap} className="p-2" alt="cap" />
                            ) : item === "jutebag" ? (
                                <img src={bag} className="p-2" alt="jutebag" />
                            ) : item === "hoodie" ? (
                                <img
                                    src={hoodie}
                                    className="p-2"
                                    alt="hoodie"
                                />
                            ) : item === "book" ? (
                                <img src={book} className="p-2" alt="book" />
                            ) : item === "keychain" ? (
                                <img
                                    src={hoodie}
                                    className="p-2"
                                    alt="keychain"
                                />
                            ) : null}
                        </div>

                        <div className="px-6 py-2 flex-felx-col">
                            <span className="text-gray-700 font-semibold text-xl">
                                Size
                            </span>
                            <div class="flex space-x-2 mt-1">
                                <label class="text-center">
                                    <input
                                        type="radio"
                                        class="flex items-center justify-center w-6 h-6"
                                        name="size"
                                        value="xs"
                                    />
                                    XS
                                </label>
                                <label class="text-center">
                                    <input
                                        type="radio"
                                        class="flex items-center justify-center w-6 h-6"
                                        name="size"
                                        value="s"
                                    />
                                    S
                                </label>
                                <label class="text-center">
                                    <input
                                        type="radio"
                                        class="flex items-center justify-center w-6 h-6"
                                        name="size"
                                        value="m"
                                    />
                                    M
                                </label>
                                <label class="text-center">
                                    <input
                                        type="radio"
                                        class="flex items-center justify-center w-6 h-6"
                                        name="size"
                                        value="l"
                                    />
                                    L
                                </label>
                                <label class="text-center">
                                    <input
                                        type="radio"
                                        class="flex items-center justify-center w-6 h-6"
                                        name="size"
                                        value="xl"
                                    />
                                    XL
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 2nd section */}
                <div className="md:w-96 pt-8 md:ml-3 sm:mx-4 mx-12 ">
                    <div className="p-3 md:px-6 md:py-3 bg-gray-200 rounded-xl shadow-xl ">
                        <form
                            method="POST"
                            action="#"
                            encType="multipart/form-data"
                        >
                            <label className="block mb-1 md:mb-3">
                                <span className="text-gray-700 text-sm md:text-[16px]">
                                    Your name
                                </span>
                                <input
                                    name="name"
                                    type="text"
                                    className="
                  block 
                  w-full
                  mt-1 p-1 md:p-2 text-sm md:text-[16px]
                  border-gray-300
                  rounded-md
                  shadow-sm
                  focus:border-indigo-300
                  focus:ring
                  focus:ring-indigo-200
                  focus:ring-opacity-50
                "
                                    placeholder="Rishika Gupta"
                                />
                            </label>
                            <label className="block mb-2 md:mb-6 mt-2 md:mt-3">
                                <span className="text-gray-700 sm:hidden text-sm md:text-[16px] ">
                                    Size
                                </span>
                                <div class="flex space-x-1 md:space-x-2 mt-1 sm:hidden">
                                    <label class="text-center">
                                        <input
                                            type="radio"
                                            class="flex items-center justify-center  w-4 h-4  bg-gray-100 rounded-lg dark:bg-gray-600"
                                            name="size"
                                            value="xs"
                                        />
                                        XS
                                    </label>
                                    <label class="text-center">
                                        <input
                                            type="radio"
                                            class="flex items-center justify-center w-4 h-4 "
                                            name="size"
                                            value="s"
                                        />
                                        S
                                    </label>
                                    <label class="text-center">
                                        <input
                                            type="radio"
                                            class="flex items-center justify-center w-4 h-4 "
                                            name="size"
                                            value="m"
                                        />
                                        M
                                    </label>
                                    <label class="text-center">
                                        <input
                                            type="radio"
                                            class="flex items-center justify-center w-4 h-4 "
                                            name="size"
                                            value="l"
                                        />
                                        L
                                    </label>
                                    <label class="text-center">
                                        <input
                                            type="radio"
                                            class="flex items-center justify-center w-4 h-4 "
                                            name="size"
                                            value="xl"
                                        />
                                        XL
                                    </label>
                                </div>
                            </label>
                            <label className="block mb-2 md:mb-6 mt-2 md:mt-3">
                                <span className="text-gray-700 text-sm md:text-[16px]">
                                    City
                                </span>
                                <input
                                    name="city"
                                    type="text"
                                    className="
                  block
                  w-full
                  mt-1
                  border-gray-300 
                  rounded-md
                  shadow-sm
                  focus:border-indigo-300
                  focus:ring
                  focus:ring-indigo-200
                  focus:ring-opacity-50
                "
                                    placeholder=""
                                />
                            </label>
                            <label className="block mb-2 md:mb-6 mt-2 md:mt-3">
                                <span className="text-gray-700  text-sm md:text-[16px]">
                                    State/Province
                                </span>
                                <input
                                    name="state"
                                    type="text"
                                    className="
                  block 
                  w-full
                  mt-1
                  border-gray-300
                  rounded-md
                  shadow-sm
                  focus:border-indigo-300
                  focus:ring
                  focus:ring-indigo-200
                  focus:ring-opacity-50
                "
                                    placeholder=""
                                />
                            </label>
                            <label className="block mb-2 md:mb-6 mt-2 md:mt-3">
                                <span className="text-gray-700  text-sm md:text-[16px]">
                                    Zip/Postal code
                                </span>
                                <input
                                    name="zip"
                                    type="text"
                                    className="
                  block
                  w-full 
                  mt-1
                  border-gray-300
                  rounded-md
                  shadow-sm
                  focus:border-indigo-300
                  focus:ring
                  focus:ring-indigo-200
                  focus:ring-opacity-50
                "
                                    placeholder=""
                                />
                            </label>
                            <label className="block mb-6">
                                <span className="text-gray-700  text-sm md:text-[16px]">
                                    Country
                                </span>
                                <input
                                    name="country"
                                    type="text"
                                    className="
                  block 
                  w-full
                  mt-1
                  border-gray-300
                  rounded-md
                  shadow-sm
                  focus:border-indigo-300
                  focus:ring
                  focus:ring-indigo-200
                  focus:ring-opacity-50
                "
                                    placeholder=""
                                />
                            </label>

                            <div className="mb-6">
                                <button
                                    className="text-sm md:text-md border  border-indigo-600 hover:bg-transparent hover:text-indigo-600 bg-[#075426] px-3 py-1 text-[#EEF0E5] rounded-lg cursor-pointer hover:scale-110 duration-300"
                                    type="submit"
                                >
                                    CONFIRM
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Delhivery;
