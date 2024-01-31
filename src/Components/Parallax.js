import hill1 from "../assets/images/hill1.png";
import hill2 from "../assets/images/hill2.png";
import hill3 from "../assets/images/hill3.png";
import hill4 from "../assets/images/hill4.png";
import hill5 from "../assets/images/hill5.png";
import tree from "../assets/images/tree.png";
import leaf from "../assets/images/leaf.png";
import plant from "../assets/images/plant.png";
import sky from "../assets/images/sky.jpg";
import { useEffect } from "react";
export default function Parallax() {
    const scrollUpdate = () => {
        let textElem = document.getElementById("parallaxText");
        let leafElem = document.getElementById("parallaxLeaf");
        let skyElem = document.getElementById("parallaxSky");
        let hill1Elem = document.getElementById("parallaxHill1");
        let hill2Elem = document.getElementById("parallaxHill2");
        let hill4Elem = document.getElementById("parallaxHill4");
        let hill5Elem = document.getElementById("parallaxHill5");
        let value = window.scrollY;
        textElem.style.marginTop = value * 2.5 + "px";
        leafElem.style.top = value * -1.5 + "px";
        leafElem.style.left = value * 1.5 + "px";
        hill5Elem.style.left = value * 1.5 + "px";
        hill4Elem.style.left = value * -1.5 + "px";
        hill4Elem.style.top = value * -0.1 + "px";
        hill1Elem.style.top = value * -0.4 + "px";
        hill2Elem.style.top = value * -0.1 + "px";
        skyElem.style.top = -50 + value * -1.5 + "px";
    };

    useEffect(() => {
        window.addEventListener("scroll", scrollUpdate);
        return () => {
            window.removeEventListener("scroll", scrollUpdate);
        };
    });
    return (
      <div
        id="home"
        className="overflow-x-hidden z-0 h-screen overflow-y-hidden w-full"
      >
        <section className="relative flex justify-center items-center h-screen">
          <img
            src={sky}
            className="absolute top-0 left-0 w-full pointer-events-none md:bg-cover md:bg-center object-cover overflow-hidden"
            id="parallaxSky"
          ></img>

          <img
            src={hill1}
            className="absolute top-0 left-0 w-full h-screen pointer-events-none md:bg-cover md:bg-center object-cover overflow-hidden"
            id="parallaxHill1"
          ></img>
          <img
            src={hill2}
            className="absolute top-0 left-0 w-full h-screen pointer-events-none md:bg-cover md:bg-center object-cover overflow-hidden"
            id="parallaxHill2"
          ></img>
          <img
            src={hill3}
            className="absolute top-0 left-0 w-full h-screen pointer-events-none md:bg-cover md:bg-center object-cover overflow-hidden"
            id="parallaxHill3"
          ></img>
          <img
            src={hill4}
            className="absolute top-0 left-0 w-full h-screen pointer-events-none md:bg-cover md:bg-center object-cover overflow-hidden"
            id="parallaxHill4"
          ></img>
          <img
            src={hill5}
            className="absolute top-0 left-0 w-full h-screen pointer-events-none md:bg-cover md:bg-center object-cover overflow-hidden"
            id="parallaxHill5"
          ></img>
          <img
            src={tree}
            className="absolute top-0 left-0 w-full h-screen pointer-events-none md:bg-cover md:bg-center object-cover overflow-hidden"
            id="parallaxTree"
          ></img>
          <h2
            id="parallaxText"
            className="font-bold drop-shadow-md font-serif absolute text-[3rem] lg:text-[4em] xl:text-[5em] text-white"
          >
            EcoBloom
          </h2>
          <img
            src={leaf}
            className="absolute top-0 left-0 w-full pointer-events-none md:bg-cover md:bg-center object-cover overflow-hidden"
            id="parallaxLeaf"
          ></img>
          <img
            src={plant}
            className="absolute top-0 left-0 w-full h-screen pointer-events-none md:bg-cover md:bg-center object-cover overflow-hidden"
            id="parallaxPlant"
          ></img>
        </section>
      </div>
    );
}
