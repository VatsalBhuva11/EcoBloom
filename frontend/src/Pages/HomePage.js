import All_Home from "../Components/All_Home";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Carousel from "../Components/Carousel";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    MotionValue,
} from "framer-motion";

export default function HomePage() {
    function useParallax(value, distance) {
        return useTransform(value, [0, 1], [-distance, distance]);
    }

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <>
            {/* <Hero /> */}
            <Navbar scaleX={scaleX} />

            {[1, 2, 3, 4, 5, 6].map((id) => {
                return (
                    <div>
                        <All_Home id={id} useParallax={useParallax} />
                    </div>
                );
            })}
            {/* <Carousel/> */}
            <div className="flex justify-center ml-[2px]">
                {/* <motion.div
                    className="fixed left-[66px] right-0 h-[4px] bg-[#304d30] top-[7px] max-w-[91%]"
                    style={{ scaleX }}
                /> */}
                <motion.div
                    className="fixed flex justify-center w-11/12 h-[4px] bg-[#144a14] top-[94px] max-w-[91%]"
                    style={{ scaleX }}
                />
            </div>

            <Footer />
        </>
    );
}
