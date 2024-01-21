import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import p1 from "../assets/images/p1.png";
import p2 from "../assets/images/p2.png";
import p3 from "../assets/images/p3.png";

export default function Carousel() {
    const settings = {
        // accessibility: true,
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
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
                    dots: false,
                },
            },
        ],
    };
    return (
        //responsiveness
        //side buttons of carousel
        //parallax background for carousel outer div
        //change card carousel
        <div className="w-full relative box-border bg-[#EEF0E5] pt-20 pb-20">
            <div className="flex flex-col justify-center items-center">
                <h1 className=" text-[#0F1035] text-4xl md:text-6xl text-center font-bold ">
                    TESTIMONIALS
                </h1>
                <p className="text-[#0F1035] text-xl md:text-2xl text-center font-bold">
                    Others have done it so you can too.
                </p>
            </div>
            <div className="md:w-[85%] m-auto flex justify-center items-center">
                <div className="w-full">
                    <Slider {...settings} className="p-16">
                        {data.map((data) => (
                            <div className="bg-white h-[70%] border-solid border-2 border-black shadow-xl flex flex-col justify-center items-center text-black rounded-xl gap-4">
                                <div className="h-28 w-full rounded-t-xl justify-center text-center flex items-center">
                                    <img
                                        src={data.img}
                                        alt=""
                                        className="h-20 w-20 rounded-full basis-[25%] md:ml-8 sm:ml-4"
                                    />
                                    <div className="flex flex-col justify-center items-center basis-[75%]">
                                        <p className="text-xl font-semibold">
                                            {data.name}
                                        </p>
                                        <p className="text-md">
                                            {data.position}
                                        </p>
                                    </div>
                                </div>
                                <div className=" flex flex-col justify-center items-center gap-4 p-4">
                                    <p>{data.content}</p>
                                    <button className="bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl">
                                        Read More!
                                    </button>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

const data = [
    {
        name: "John Doe",
        img: p1,
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis saepe aliquam, ",
        position: "Manager",
    },
    {
        name: "Jane Doe",
        img: p2,
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis saepe aliquam, ",
        position: "Manager",
    },
    {
        name: "Jack Doe",
        img: p3,
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis saepe aliquam, ",
        position: "Manager",
    },
    {
        name: "John Doe",
        img: p1,
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis saepe aliquam, ",
        position: "Manager",
    },
    {
        name: "Jane Doe",
        img: p2,
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis saepe aliquam, ",
        position: "Manager",
    },
    {
        name: "Jack Doe",
        img: p3,
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis saepe aliquam, ",
        position: "Manager",
    },
];
