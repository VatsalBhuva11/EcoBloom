import React from "react";
import about from "../assets/images/about.png";
import { FaArrowRight } from "react-icons/fa";

export default function About() {
  return (
    <div
      id="about"
      className="w-full bg-[url('./assets/images/underground.jpg')] bg-cover justify-between pt-12"
    >
      <div className="max-w-[1240px] mx-auto justify-center items-center">
        {/* <h1 className="py-3 text-[#EEF0E5] text-4xl md:text-6xl text-center font-bold mt-12">
          ABOUT US
        </h1> */}
        <div className="flex justify-evenly items-center px-2 py-12">
          
            <p className="text-sm sm:text-lg md:text-xl pl-3 lg:text-2xl tracking-wide  md:mt-12 text-[#f5d2a8] font-semibold text-left ml-3">
              Welcome to EcoBloom, a thriving ecosystem where environmental
              enthusiasts, whether they're grassroots initiatives or established
              entities, come together to make a tangible difference in the
              world. At EcoBloom, we're not just a platform; we're a vibrant
              community dedicated to amplifying your environmental impact.
            </p>
          
            <img
              src={about}
              className="hidden md:flex h-72 lg:h-96 lg:w-96"
              alt="ecobloom"
            />
          
        </div>
      </div>
    </div>
  );
}
