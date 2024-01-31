import React from "react";
import about from "../assets/images/about.png";
import { FaArrowRight } from "react-icons/fa";

export default function About() {
  return (
    <div
      id="about"
      className="w-full h-screen bg-[url('./assets/images/underground.jpg')] bg-cover justify-between pt-12"
    >
      <div className="max-w-[1240px] mx-auto justify-center items-center">
        <h1 className="py-3 text-[#EEF0E5] text-4xl md:text-6xl text-center font-bold mt-12">
          ABOUT US
        </h1>
        <div className="grid md:grid-cols-2 px-2 py-12">
          <div>
            <p className="text-xl md:text-3xl tracking-wide  md:mt-12 text-[#f5d2a8] font-semibold text-left">
              Welcome to EcoBloom, a thriving ecosystem where environmental
              enthusiasts, whether they're grassroots initiatives or established
              entities, come together to make a tangible difference in the
              world. At EcoBloom, we're not just a platform; we're a vibrant
              community dedicated to amplifying your environmental impact.
            </p>
          </div>
          <div>
            <img
              src={about}
              className="hidden md:block ml-32 xl:h-[20rem]  h-[15rem]"
              alt="ecobloom"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
