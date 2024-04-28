import React from "react";
import { useRef } from "react";
import about from "../assets/images/about.png";
import { FaArrowRight } from "react-icons/fa";
import { useScroll, motion } from "framer-motion";

export default function About() {
  // const ref = useRef(null);
  // const { scrollYProgress } = useScroll({ target: ref});
  // const y = useParallax(scrollYProgress, 300);
  return (
    <div
      id="about"
      className="w-full bg-[url('./assets/images/rrootz.png')] bg-fixed bg-center bg-no-repeat bg-cover justify-between"
    >
      <div className="max-w-[1240px] mx-auto justify-center items-center">
        {/* <h1 className="py-3 text-[#fbfbfa] text-4xl md:text-6xl text-center font-bold mt-12">
          ABOUT US
        </h1> */}
        <div className="flex justify-evenly items-center px-2 py-12">
          <p className="text-sm sm:text-lg md:text-xl px-4 lg:text-2xl tracking-wide text-center  md:mt-12 text-[#f5d2a8] font-semibold mx-8">
            Welcome to EcoBloom, a thriving ecosystem where environmental
            enthusiasts, whether they're grassroots initiatives or established
            entities, come together to make a tangible difference in the world.
            At EcoBloom, we're not just a platform; we're a vibrant community
            dedicated to amplifying your environmental impact, designed to
            facilitate and incentivize cleanliness campaigns organized by
            various entities. Users can actively participate in campaigns, earn
            rewards, and contribute to a cleaner environment.
          </p>
          {/*           
            <img
              src={about}
              className="hidden md:flex h-72 lg:w-96"
              alt="ecobloom"
            /> */}
        </div>
      </div>
      {/* <motion.h2 style={{ y }}></motion.h2> */}
    </div>
  );
}
