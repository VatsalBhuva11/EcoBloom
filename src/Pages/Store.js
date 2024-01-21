import React from "react";
import logo from "../assets/images/logo.png";
import shirt from "../assets/images/shirt.png";
import bag from "../assets/images/bag.png";
import cap from "../assets/images/cap (2).png";
import hoodie from "../assets/images/hoodie.png";
import keychain from "../assets/images/keychain (2).png";
import book from "../assets/images/book.png";
import { SiDogecoin } from "react-icons/si";
import { Link } from "react-router-dom";
const Store = () => {
  return (
    <div className=" h-full bg-[#EEF0E5] ">
      <div>
        <div className="flex justify-between">
          <div className="flex">
            <Link to='/'><img className="h-24 hover:scale-105 duration-300 mt-4" src={logo} alt="" /></Link>
            <h1 className="text-3xl md:text-4xl font-bold mt-9 text-[#0F1035]">
              REWARDS & PRIZES
            </h1>
          </div>

          <div className="hidden md:flex cursor-pointer mt-10 mr-[60px]">
            <p className=" text-xl font-light pt-1 ">Your Points: </p>
            <p className="pl-2 flex text-2xl font-bold   text-[#FF7512]">
              <SiDogecoin className=" mr-1 mt-1 text-[#FFCC4D]" /> 587
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 content-center mt-8 ml-8 pb-6">
          <div class="bg-[#DFE4C5] rounded-lg hover:scale-105 duration-300 w-fit shadow-2xl flex flex-col">
            <div>
              <img src={shirt} className="p-2" alt="zipper" />
            </div>
            <div className="flex justify-between">
              <div>
                <h5 class="p-4 text-md md:text-xl text-gray-900">
                  EcoBloom T-Shirt
                </h5>{" "}
              </div>
              <div className="px-4 py-2">
                <button className="bg-[#F0904B] rounded-lg hover:bg-[#EE731A]">
                  <p className="flex text-white text-sm md:text-xl px-2 py-1 ">
                    1000 <SiDogecoin className="mt-1 ml-2 text-[#FFCC4D]" />
                  </p>
                </button>
              </div>
            </div>
          </div>

          <div class="bg-[#DFE4C5] rounded-lg hover:scale-105 duration-300 w-fit shadow-2xl flex flex-col">
            <div>
              <img src={cap} className="p-2" alt="zipper" />
            </div>
            <div className="flex justify-between">
              <div>
                <h5 class="p-4 text-md md:text-xl text-gray-900">
                  EcoBloom Cap
                </h5>{" "}
              </div>
              <div className="px-4 py-2">
                <button className="bg-[#F0904B] rounded-lg hover:bg-[#EE731A]">
                  <p className="flex text-white text-sm md:text-xl px-2 py-1 ">
                    500 <SiDogecoin className="mt-1 ml-2 text-[#FFCC4D]" />
                  </p>
                </button>
              </div>
            </div>
          </div>

          <div class="bg-[#DFE4C5] w-fit hover:scale-105 duration-300 rounded-lg shadow-2xl flex flex-col">
            <div>
              <img src={bag} className="p-2" alt="zipper" />
            </div>
            <div className="flex justify-between">
              <div>
                <h5 class="p-4 text-md md:text-xl text-gray-900 ">
                  EcoBloom JuteBag
                </h5>{" "}
              </div>
              <div className="px-4 py-2">
                <button className="bg-[#F0904B] rounded-lg hover:bg-[#EE731A]">
                  <p className="flex text-white text-sm md:text-xl px-2 py-1 ">
                    2000 <SiDogecoin className="mt-1 ml-2 text-[#FFCC4D]" />
                  </p>
                </button>
              </div>
            </div>
          </div>

          <div class="bg-[#DFE4C5] w-fit hover:scale-105 duration-300 rounded-lg shadow-2xl flex flex-col">
            <div>
              <img src={hoodie} className="p-2" alt="zipper" />
            </div>
            <div className="flex justify-between">
              <div>
                <h5 class="p-4 text-md md:text-xl text-gray-900 ">
                  EcoBloom Hoodie
                </h5>{" "}
              </div>
              <div className="px-4 py-2">
                <button className="bg-[#F0904B] rounded-lg hover:bg-[#EE731A]">
                  <p className="flex text-white text-sm md:text-xl px-2 py-1 ">
                    4000 <SiDogecoin className="mt-1 ml-2 text-[#FFCC4D]" />
                  </p>
                </button>
              </div>
            </div>
          </div>

          <div class="bg-[#DFE4C5] w-fit hover:scale-105 duration-300 rounded-lg shadow-2xl flex flex-col">
            <div>
              <img src={book} className="p-2" alt="zipper" />
            </div>
            <div className="flex justify-between">
              <div>
                <h5 class="p-4 text-md md:text-xl text-gray-900 ">
                  EcoBloom Notebook
                </h5>{" "}
              </div>
              <div className="px-4 py-2">
                <button className="bg-[#F0904B] rounded-lg hover:bg-[#EE731A]">
                  <p className="flex text-white text-sm md:text-xl px-2 py-1 ">
                    1500 <SiDogecoin className="mt-1 ml-2 text-[#FFCC4D]" />
                  </p>
                </button>
              </div>
            </div>
          </div>

          <div class="bg-[#DFE4C5] w-fit hover:scale-105 duration-300 rounded-lg shadow-2xl flex flex-col">
            <div>
              <img src={keychain} className="p-2" alt="zipper" />
            </div>
            <div className="flex justify-between">
              <div>
                <h5 class="p-4 text-md md:text-xl text-gray-900 ">
                  EcoBloom Keychain
                </h5>{" "}
              </div>
              <div className="px-4 py-2">
                <button className="bg-[#F0904B] rounded-lg hover:bg-[#EE731A]">
                  <p className="flex text-white text-sm md:text-xl px-2 py-1 ">
                    400 <SiDogecoin className="mt-1 ml-2 text-[#FFCC4D]" />
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
