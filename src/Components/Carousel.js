import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import p1 from "../assets/images/p1.png";
import p2 from "../assets/images/p2.png";
import p3 from "../assets/images/p3.png";

export default function Carousel() {
    const settings = {
        // accessibility: true,
        // className: 'center',
        // centerMode: true,
        //  centerPadding: '20px',
         dots: true,
        //  fade:true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
    //     autoplay: true,
    //   autoplaySpeed: 1000,
    //   pauseOnHover: true,
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
                            <div className="bg-transparent h-[70%] border-solid border-2 border-black shadow-xl flex flex-col justify-center items-center text-black rounded-xl gap-4">
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
    // {
    //     name: "Sarah Thompson",
    //     img: p1,
    //     content:
    //     "As an environmental activist, EcoBloom has revolutionized the way we organize and participate in campaigns. The platform's user-friendly interface and real-time progress tracking make it a game-changer. With EcoBloom, our collective efforts translate into visible impact.",
    //     position: "Environmental Activist",


    // },
    {
        name: "Alex Rodriguez",
        img: p2,
        content:
        "EcoBloom has become an indispensable tool for community organizers like me. The organizational oversight dashboard allows us to manage campaigns efficiently, verify users, and regulate community interactions. It's a powerful platform for fostering environmental engagement at the grassroots level.",
        position: "Community Organizer",
    },
    {
        name: "Emily Chen",
        img: p3,
        content:
        "Being a student, EcoBloom has made it easy for me to actively participate in environmental campaigns. The gamified point system adds a fun element, and I love seeing the real-time impact of my contributions. It's a fantastic way to make a difference while connecting with like-minded individuals.",
        position: "Student and Eco-Enthusiast",
    },
    {
        name: "James Anderson",
        img: p1,
        content:
        "EcoBloom's technological integration is impressive. As a tech entrepreneur, I appreciate the seamless user experience and the platform's adaptability. The intuitive campaign creation interface aligns perfectly with the tech-savvy generation, making environmental participation accessible to all.",
        position: "Tech Entrepreneur",
    },
    {
        name: "Dr. Maria Garcia",
        img: p2,
        content:
        "From a scientific perspective, EcoBloom stands out in its ability to measure and showcase the impact of campaigns. The real-time progress tracking and data analytics features provide valuable insights, making it an invaluable resource for researchers and environmental scientists.",
        position: "Environmental Scientist",
    },
    {
        name: "Raj Patel",
        img: p3,
        content:
        "As a small business owner committed to sustainability, EcoBloom has allowed me to engage my local community in eco-friendly initiatives. The platform's community-building features and campaign rewards have not only helped the environment but also brought positive attention to my business.",
        position: "Small Business Owner",
    },
];
