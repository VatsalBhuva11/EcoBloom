import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import emilychen from "../assets/images/emilychen.jpeg";
import james from "../assets/images/james.jpg";
import maria from "../assets/images/maria.jpeg";
import raj from "../assets/images/raj.jpeg";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

export default function Carousel() {
  //     const ref = useRef(null);
  //   const { scrollYProgress } = useScroll({ target: ref });
  //   const y = useParallax(scrollYProgress, 300);

  const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },

      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          fade: true,
          dots: false,
        },
      },
    ],
  };

  useEffect(() => {
    Aos.init();
    Aos.refresh();
  }, []);

  return (
    //responsiveness
    //side buttons of carousel
    //parallax background for carousel outer div
    //change card carousel
    <div className="w-full relative box-border bg-[#fbfbfa] pt-20 pb-20">
      <div className="flex flex-col justify-center items-center">
        <h1
          data-aos="fade-up"
          data-aos-duration="1000"
          className=" text-[#277868] text-4xl md:text-6xl text-center font-bold "
        >
          TESTIMONIALS
        </h1>
        <p
          data-aos="fade-up"
          data-aos-duration="1000"
          className="text-[#277868] text-xl md:text-2xl text-center font-bold"
        >
          Others have done it so you can too.
        </p>
      </div>
      <div className="md:w-[85%] m-auto flex justify-center items-center">
        <div className="w-full">
          <Slider {...settings} className="flex justify-center p-16">
            {data.map((data) => (
              <div
                data-aos="zoom-in"
                data-aos-duration="1000"
                className="bg-transparent h-[70%] shadow-lg  border-2 border-[#277868] hover:shadow-xl  cursor-pointer flex flex-col justify-center items-center rounded-xl gap-4"
              >
                <div className="h-32 w-full rounded-t-xl justify-center text-center flex items-center">
                  <img
                    src={data.img}
                    alt=""
                    className="h-20 w-20 rounded-full basis-[25%] md:ml-8 sm:ml-4"
                  />
                  <div className="flex flex-col justify-center items-center basis-[75%]">
                    <p className="text-xl font-semibold text-[#277868]">
                      {data.name}
                    </p>
                    <p className="text-md text-black">{data.position}</p>
                  </div>
                </div>
                <div className=" flex flex-col justify-center items-center gap-4 p-4 text-black">
                  <p>{data.content}</p>
                  {/* <button className=" bg-[#304D30] text-white text-lg px-6  py-1 rounded-xl">
                                        Read More!
                                    </button> */}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      {/* <motion.h2 style={{ y }}></motion.h2> */}
    </div>
  );
}

const data = [
  // {
  //     name: "Sarah Thompson",
  //     img: p1,
  //     content:
  //     "As an environmental activist, EcoBloom has revolutionized the way we organize and participate in campaigns. The platform's user-friendly interface and real-time progress tracking make it a game-changer. With EcoBloom, our collective efforts translate into visible impact.",
  //     position: "Environmental Activist",

  // },
  {
    name: "Emily Chen",
    img: emilychen,
    content:
      "As a student and eco-enthusiast, EcoBloom empowers me to engage my local community in eco-friendly initiatives, contributing to improved sustainability.",
    position: "Student and Eco-Enthusiast",
  },
  {
    name: "James Anderson",
    img: james,
    content:
      "As a tech entrepreneur, EcoBloom provides me with the platform to involve my local community in eco-friendly initiatives, thereby advancing sustainability goals.",
    position: "Tech Entrepreneur",
  },
  {
    name: "Dr. Maria Garcia",
    img: maria,
    content:
      "As an environmental scientist, EcoBloom enables me to engage my local community in eco-friendly initiatives, driving forward sustainability efforts.",
    position: "Environmental Scientist",
  },
  {
    name: "Raj Patel",
    img: raj,
    content:
      "As a small business owner, EcoBloom allows me to involve my local community in eco-friendly initiatives, enhancing sustainability efforts and goals.",
    position: "Small Business Owner",
  },
];
