import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function About() {
    // const ref = useRef(null);
    // const { scrollYProgress } = useScroll({ target: ref});
    // const y = useParallax(scrollYProgress, 300);

    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    return (
        <div
            id="about"
            className="w-full bg-[#277868] bg-fixed bg-center bg-no-repeat bg-cover justify-between"
        >
            <div className="max-w-[1240px] mx-auto justify-center items-center">
                <h1 className="py-8  text-[#fbfbfa] text-4xl md:text-6xl text-center font-bold">
                    ABOUT US
                </h1>
                <div className="flex justify-evenly items-center px-2 pb-12">
                    <p
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        className="text-sm sm:text-lg md:text-xl px-4 lg:text-2xl tracking-wide text-center  md:mt-12 text-[#DBDBDB] font-semibold mx-8"
                    >
                        Welcome to EcoBloom, a thriving ecosystem where
                        environmental enthusiasts, whether they're grassroots
                        initiatives or established entities, come together to
                        make a tangible difference in the world. At EcoBloom,
                        we're not just a platform; we're a vibrant community
                        dedicated to amplifying your environmental impact,
                        designed to facilitate and incentivize cleanliness
                        campaigns organized by various entities. Users can
                        actively participate in campaigns, earn rewards, and
                        contribute to a cleaner environment.
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
