import React, { useState } from 'react';
import hero1 from '../assets/images/hero1.png'
import hero2 from '../assets/images/hero2.png'
import hero3 from '../assets/images/hero3.png'
import hero4 from '../assets/images/hero4.png'
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";


export default function Hero() {
    let [current, setCurrent] = useState(0);

    let previousSlide = ()=>{
        if(current===0) setCurrent(3);
        else setCurrent(current-1);
    }

    let nextSlide = ()=>{
        if(current===3) setCurrent(0);
        else setCurrent(current+1);
        console.log(current);
    }


    return (
        <div>
            <div className="overflow-hidden relative">
                <div className={`flex transition ease-out duration-700`}
                    style={{
                        transform: `translateX(-${current*100})`
                    }}
                >
                    <img className="max-w-full mx-auto p-4" src={hero1} alt='..' />
                    <img className="max-w-full mx-auto p-4" src={hero2} alt='..' />
                    <img className="max-w-full mx-auto p-4" src={hero3} alt='..' />
                    <img className="max-w-full mx-auto p-4" src={hero4} alt='..' />
                </div>
                <div className=' absolute h-full top-0 w-full flex justify-between items-center'>
                    <button onClick={previousSlide}>
                        <IoIosArrowBack />
                    </button>
                    <button onClick={nextSlide}>
                        <IoIosArrowForward />
                    </button>

                </div>

                <div className="absolute bottom-0 py-4 flex justify-center gap-4 w-full">
                    <div className="rounded-full w-3 h-3 bg-black"></div>
                    <div className="rounded-full w-3 h-3 bg-black"></div>
                    <div className="rounded-full w-3 h-3 bg-black"></div>
                    <div className="rounded-full w-3 h-3 bg-black"></div>
                </div>


            </div>
        </div>
    )
}
