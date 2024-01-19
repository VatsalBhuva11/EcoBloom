import hill1 from "../assets/images/hill1.png";
import hill2 from "../assets/images/hill2.png";
import hill3 from "../assets/images/hill3.png";
import hill4 from "../assets/images/hill4.png";
import hill5 from "../assets/images/hill5.png";
import tree from "../assets/images/tree.png";
import leaf from "../assets/images/leaf.png";
import plant from "../assets/images/plant.png";
import sky from "../assets/images/sky.jpg";
export default function Parallax() {
    return (
        <div className="overflow-x-hidden z-0 overflow-y-hidden">
            <section className="relative flex justify-center items-center h-screen">
                <img
                    src={sky}
                    className="absolute bottom-50 left-0 w-full pointer-events-none "
                    id="parallaxSky"
                ></img>
                <img
                    src={hill1}
                    className="absolute top-0 left-0 w-full pointer-events-none "
                    id="parallaxHill1"
                ></img>
                <img
                    src={hill2}
                    className="absolute top-0 left-0 w-full pointer-events-none "
                    id="parallaxHill2"
                ></img>
                <img
                    src={hill3}
                    className="absolute top-0 left-0 w-full pointer-events-none "
                    id="parallaxHill3"
                ></img>
                <img
                    src={hill4}
                    className="absolute top-0 left-0 w-full pointer-events-none "
                    id="parallaxHill4"
                ></img>
                <img
                    src={hill5}
                    className="absolute top-0 left-0 w-full pointer-events-none "
                    id="parallaxHill5"
                ></img>
                <img
                    src={tree}
                    className="absolute top-0 left-0 w-full pointer-events-none "
                    id="parallaxTree"
                ></img>
                <h2
                    id="parallaxText"
                    className="font-bold drop-shadow-md font-serif absolute text-[5em] text-white"
                >
                    EcoBloom
                </h2>
                <img
                    src={leaf}
                    className="absolute top-0 left-0 w-full pointer-events-none "
                    id="parallaxLeaf"
                ></img>
                <img
                    src={plant}
                    className="absolute top-0 left-0 w-full pointer-events-none "
                    id="parallaxPlant"
                ></img>
            </section>
        </div>
    );
}
