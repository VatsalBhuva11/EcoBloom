import React from 'react'
import about from '../assets/images/about.png'
import { FaArrowRight } from 'react-icons/fa'



export default function About() {
  return (
    <div className="w-full h-screen bg-[#EEF0E5] justify-between pt-12">
    <div className="max-w-[1240px] mx-auto justify-center items-center">
      <h1 className="py-3 text-[#0F1035] text-4xl md:text-6xl text-center font-bold">
        ABOUT US
      </h1>
      <div className="grid md:grid-cols-2 px-2 py-12">
        <div>
          <p className="text-xl md:text-2xl  md:mt-12 text-[#0F1035] font-medium text-left">
            Step into the world of EcoBloom, where we're not just a platform.
            It doesn't matter if you're a grassroots initiative or an
            established entity; EcoBloom is your canvas to amplify your
            environmental impact. Join us in this collaborative effort, where
            every small action contributes to a cleaner planet.
          </p>
          <button className="flex mt-8 py-2 px-6 text-center md:text-3xl text-white border bg-[#0F1035] hover:font-bold hover:bg-transparent hover:border-[#0F1035] hover:text-[#0F1035] rounded-md">
            Read More{" "}
            <FaArrowRight className="hidden md:flex ml-4 mt-2 " size={25} />
          </button>
        </div>
        <div>
          <img
            src={about}
            className="hidden md:block ml-32  h-[20rem]"
            alt="ecobloom"
          />
        </div>
      </div>
    </div>
  </div>
  )
}
