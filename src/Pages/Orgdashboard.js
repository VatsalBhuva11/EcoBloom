import React, { useState, useEffect, useContext } from "react";
import p1 from "../assets/images/p1.png";
import p2 from "../assets/images/p2.png";
import p3 from "../assets/images/p3.png";
import p4 from "../assets/images/p4.png";
import p5 from "../assets/images/p5.png";
import p6 from "../assets/images/p6.png";
import org_logo from "../assets/images/org_logo.png";
import bannerorg from "../assets/images/bannerorg.png";
import logo from "../assets/images/logo.png";
import { IoIosSend } from "react-icons/io";
import { HiPencil } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { HashLoader } from "react-spinners";
import arrow from "../assets/images/arrow.png";
import PastCampaignsCards from "../Components/PastCampaignsCards";
import { FaArrowRightLong } from "react-icons/fa6";
import Community_Joined_Card from "./Community_Joined_Card";
import NewPost from "../Components/NewPost";
import { jwtDecode } from "jwt-decode";
import { auth, storage } from "../firebase.js";
import { getDownloadURL, ref } from "firebase/storage";
import { ProfileContext } from "../Components/ProfileContextProvider.js";
import moment from "moment";

const Orgdashboard = () => {
    // const [loader, setLoader] = useState(true);
    const [user, loading, error] = useAuthState(auth);
    const [status, setStatus] = useState("about");
    const [ifBold1, setIfBold1] = useState("bold");
    const [ifBold2, setIfBold2] = useState("normal");
    const [ifBold3, setIfBold3] = useState("normal");
    const [showMyModel, setShowMyModal] = useState(false);
    const handleOnClose = () => setShowMyModal(false);

    const [org, setOrg] = useState({});
    const [loader, setLoader] = useState(true);
    const [logo, setLogo] = useState(null);
    const [banner, setBanner] = useState(null);
    const [profile, setProfile] = useContext(ProfileContext);

    useEffect(() => {
        if (auth.currentUser) {
            auth.currentUser.getIdToken().then((idToken) => {
                const idTokenResult = jwtDecode(idToken);
                if (idTokenResult.role !== "org") {
                    alert("Please login with organization credentials.");
                    window.location.replace("/login");
                } else {
                    fetch(
                        `${process.env.REACT_APP_LOCAL_API_URL}/org/${idTokenResult.orgId}`
                    )
                        .then((response) => response.json())
                        .then(async (org) => {
                            console.log(org);
                            const storageRef1 = ref(storage, org.data.logo);
                            const storageRef2 = ref(storage, org.data.banner);
                            const data = await Promise.all([
                                getDownloadURL(storageRef1),
                                getDownloadURL(storageRef2),
                            ]);
                            localStorage.setItem(
                                "profile",
                                JSON.stringify({
                                    logo: data[0],
                                    banner: data[1],
                                    name: org.data.name,
                                })
                            );
                            setProfile({
                                logo: data[0],
                                banner: data[1],
                                name: org.data.name,
                            });

                            setLogo(data[0]);
                            setBanner(data[1]);
                            setOrg(org.data);
                            console.log(org.data);
                            setLoader(false);
                        })
                        .catch((err) => {
                            console.log(err);
                            setLoader(false);
                            alert("Unable to fetch organization data");
                            window.location.replace("/user/dashboard");
                        });
                }
            });
        } else {
            window.location.replace("/login");
        }
    }, [loading]);

    const handleABoutChange = () => {
        setIfBold1("bold");
        setIfBold2("normal");
        setIfBold3("normal");
        //console.log("about")
        setStatus("about");
    };

    const handlePastChange = () => {
        setIfBold1("normal");
        setIfBold2("normal");
        setIfBold3("bold");
        //console.log("people")
        setStatus("people");
    };

    const handlePostChange = () => {
        setIfBold1("normal");
        setIfBold2("bold");
        setIfBold3("normal");
        console.log("post page");
        setStatus("post");
    };

    // if (loading || loader) {
    if (loading || loader) {
        return (
            <div className="h-screen flex items-center justify-center">
                <HashLoader color="#36d7b7" size={100} />
            </div>
        );
    }
    if (!loading && !user) {
        window.location.replace("/login");
    }
    return (
        <div className="flex">
            <div className=" flex flex-col w-full lg:w-[75%]">
                {/* navbar */}
                <div className="w-full bg-[#0f1035] text-gray-200 flex shadow-2xl ">
                    <div className="flex items-center ">
                        <Link to="/">
                            <img
                                className="h-12  hover:scale-105 duration-300 md:h-16 mt-2"
                                src={org_logo}
                                alt=""
                            />
                        </Link>
                        <h1 className="text-sm sm:text-xl md:text-2xl  ">
                            ORGANISATION DASHBOARD
                        </h1>
                    </div>
                </div>
                {/* navbar */}
                <div className="w-full h-full bg-[#EEF0E5]">
                    <div className="mx-2 flex flex-col bg-[#DFE4C5] rounded-lg">
                        <div className=" ">
                            <img
                                className="h-32 sm:h-36 md:h-48 w-full "
                                src={banner}
                                alt=""
                            />
                        </div>

                        <div className="flex border-b-2 pb-5 border-[#7A7A7A]">
                            <div className="w-[20%] md:w-[15%]">
                                <img
                                    className="h-16 sm:h-24 md:h-32 mt-[-32px] md:mt-[-48px] pl-4"
                                    src={logo}
                                    alt=""
                                />
                            </div>
                            <div className="flex flex-col pt-2 pl-2 md:pl-4 ">
                                <h1 className="text-[#0f1035] md:pt-4 font-bold text-xl sm:text-2xl md:text-4xl">
                                    {org.name}
                                </h1>
                                <p className="text-[14px] sm:text-lg md:text-2xl pt-1 sm:pt-3">
                                    The Technical Club Information Technology,
                                    Allahabad
                                </p>
                                <p className="text-[14px] sm:text-lg md:text-xl pt-1 sm:pt-1">
                                    {org.communityUsersCount} Members
                                </p>
                                <div className="flex pt-3 md:pt-6  gap-3 sm:gap-4 md:gap-6 ">
                                    <Link to="/chat">
                                        <button className="border-solid border-2 border-[#0f1035] hover:scale-105 duration-300 bg-transparent  flex text-[#0f1035] rounded-3xl py-1 px-3 sm:py-1.5 sm:px-4 text-md sm:text-lg md:text-xl sm:gap-1 md:gap-2 font-semibold ">
                                            <IoIosSend
                                                className="sm:flex hidden"
                                                size={30}
                                            />{" "}
                                            Community Chat
                                        </button>
                                    </Link>
                                    <button className="bg-[#0f1035] flex hover:scale-105 duration-300 text-gray-200 rounded-3xl py-1 px-3 sm:py-1.5 sm:px-6 text-md sm:text-lg md:text-xl sm:gap-3 md:gap-4 font-semibold">
                                        <HiPencil
                                            className="pt-1 sm:flex hidden"
                                            size={25}
                                        />{" "}
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-2  ml-6  pr-2">
                            <div
                                className={`flex gap-6 sm:gap-10 md:gap-12 pb-2`}
                            >
                                <button onClick={handleABoutChange}>
                                    <p
                                        className={`text-md sm:text-lg md:text-xl cursor-pointer font-${ifBold1}`}
                                    >
                                        ABOUT
                                    </p>
                                </button>
                                <button onClick={handlePostChange}>
                                    <p
                                        className={`text-md sm:text-lg md:text-xl cursor-pointer font-${ifBold2}`}
                                    >
                                        POSTS
                                    </p>
                                </button>
                                <button onClick={handlePastChange}>
                                    <p
                                        className={`text-md sm:text-lg md:text-xl cursor-pointer font-${ifBold3}`}
                                    >
                                        PAST CAMPAIGNS
                                    </p>
                                </button>
                            </div>
                            <div>
                                <button
                                    onClick={() => setShowMyModal(true)}
                                    className="bg-[#0f1035] mb-2 flex hover:scale-105 duration-300 text-gray-200 rounded-3xl py-1 px-3 sm:px-3  text-md sm:text-lg md:text-lg gap-2 font-semibold"
                                >
                                    <FaPlus className=" mt-1" size={20} /> New
                                    Post
                                </button>
                            </div>
                        </div>
                    </div>
                    {status === "about" ? (
                        <div>
                            <div className="text-center lg:text-2xl text-lg font-semibold mt-5">
                                ABOUT US
                            </div>
                            <div className="mt-4 lg:text-lg text-sm ml-2 p-2 font-medium">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Earum aspernatur ex neque
                                aliquid quis? Officiis deleniti necessitatibus
                                vitae, earum magni voluptates dolores vel
                                corrupti assumenda nemo qui iusto nobis.
                                Corporis eius maiores consequuntur obcaecati
                                iste a ullam aut, doloremque porro? Veniam cum
                                laudantium excepturi, voluptatem voluptatibus
                                dolorem rerum voluptatum laborum vero sunt
                                libero, vitae hic, nihil a suscipit nisi.
                                Accusamus rem placeat earum libero ullam
                                suscipit a officiis ut sint. Et ab neque, id
                                quis laudantium similique! Vel, sit.
                            </div>
                        </div>
                    ) : status === "post" ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-6">
                            <div>
                                <img
                                    className="h-auto max-w-full"
                                    src={p4}
                                    alt=""
                                />
                            </div>
                            <div>
                                <img
                                    className="h-auto max-w-full"
                                    src={p5}
                                    alt=""
                                />
                            </div>
                            <div>
                                <img
                                    className="h-auto max-w-full"
                                    src={p6}
                                    alt=""
                                />
                            </div>
                            <div>
                                <img
                                    className="h-auto max-w-full"
                                    src={p1}
                                    alt=""
                                />
                            </div>
                            <div>
                                <img
                                    className="h-auto max-w-full"
                                    src={p2}
                                    alt=""
                                />
                            </div>
                            <div>
                                <img
                                    className="h-auto max-w-full"
                                    src={p3}
                                    alt=""
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-5 p-8">
                            <PastCampaignsCards />
                            <PastCampaignsCards />
                            <PastCampaignsCards />
                            <PastCampaignsCards />
                            <PastCampaignsCards />
                        </div>
                    )}
                </div>
            </div>
            {/* user profile ends */}
            <div className="hidden lg:flex lg:flex-col lg:w-[25%]">
                <div className="w-full h-screen fixed bg-[#0f1035] text-gray-200 shadow-3xl ">
                    {/* search bar */}

                    <div className="search w-[98%]  md:ml-4 lg:ml-8 mt-14">
                        <form>
                            <div class="flex">
                                <input
                                    type="search"
                                    id="default-search"
                                    class="block p-1 lg:p-2 text-md lg:text-xl text-gray-200 rounded-lg bg-[#353657] focus:ring-white focus:border-white"
                                    placeholder="search"
                                />
                                <FaSearch
                                    className="hidden lg:flex text-gray-300 ml-4 mt-2"
                                    size={25}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="justify-center items-center md:ml-4 lg:ml-14">
                        <Link to="/createcampaign">
                            <button className=" flex justify-center items-center gap-2 bg-[#eef0e5] text-[#0f1035] md:text-[16px] lg:text-[18px] 2xl:text-[20px] font-bold rounded-lg  md:h-[2.2rem] lg:h-[2.4rem]  2xl:h-[2.8rem] md:w-48 lg:w-52 2xl:w-64 hover:scale-105 duration-300 mt-10">
                                <FaPlus />
                                Create Campaign
                            </button>
                        </Link>
                    </div>
                    <div className="">
                        <div className="flex items-center cursor-pointer ml-2">
                            <div className="text-[#eef0e5] lg:text-2xl tex-xl md:mt-4 lg:mt-6  font-semibold">
                                Ongoing Campaigns
                            </div>
                            <img
                                className="w-[15px] h-[25px] xl:w-[20px] xl:h-[30px] lg:mt-8 lg:ml-5 mt-5 ml-4 rounded-full"
                                src={arrow}
                                alt="altt"
                            />
                        </div>
                        {/* <Link to="/org/ongoing">
                                
                            </Link> */}
                        <div className="flex flex-col gap-4 xl:gap-5 mt-5">
                            {org?.ongoingCampaigns?.length > 0 ? (
                                org.ongoingCampaigns.map((campaign) => {
                                    return (
                                        <a href="">
                                            <div className="flex pb-3 items-center  border-b-2 lg:gap-3 xl:gap-7 px-2 ">
                                                <div className="font-bold">
                                                    {moment(
                                                        campaign.endDate
                                                    ).format("ll")}
                                                </div>
                                                <div className="flex flex-col">
                                                    <p className="text-[#eef0e5] text-[1rem] xl:text-[18px] mt-1 lg:mt-0">
                                                        {campaign.name}
                                                    </p>
                                                    <p className="text-[#eef0e5] text-[0.75rem]">
                                                        {
                                                            campaign.verifiedUsersCount
                                                        }{" "}
                                                        people attended
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    );
                                })
                            ) : (
                                <div className="flex pb-3 items-center  border-b-2 lg:gap-3 xl:gap-7 px-2 ">
                                    <p className="text-white text-md">
                                        No ongoing campaigns.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mt-10 h-[50%] ">
                        <div className="flex items-center cursor-pointer ml-2">
                            <div className="text-[#eef0e5] lg:text-2xl tex-xl md:mt-4 lg:mt-6  font-semibold">
                                Upcoming Campaigns
                            </div>
                            <img
                                className="w-[15px] h-[25px] xl:w-[20px] xl:h-[30px] lg:mt-8 lg:ml-5 mt-5 ml-4 rounded-full"
                                src={arrow}
                                alt="altt"
                            />
                        </div>
                        <div className="flex flex-col gap-4 xl:gap-5 mt-5 ">
                            {org?.upcomingCampaigns?.length > 0 ? (
                                org.upcomingCampaigns.map((campaign) => {
                                    return (
                                        <a href="">
                                            <div className="flex pb-3 items-center  border-b-2 lg:gap-3 xl:gap-7 px-2 ">
                                                <div className="font-bold">
                                                    {moment(
                                                        campaign.startDate
                                                    ).format("ll")}
                                                </div>
                                                <div className="flex flex-col">
                                                    <p className="text-[#eef0e5] text-[1rem] xl:text-[18px] mt-1 lg:mt-0">
                                                        {campaign.name}
                                                    </p>
                                                    <p className="text-[#eef0e5] text-[0.75rem]">
                                                        {
                                                            campaign.registeredUsersCount
                                                        }{" "}
                                                        people registerd
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    );
                                })
                            ) : (
                                <div className="flex pb-3 items-center  border-b-2 lg:gap-3 xl:gap-7 px-2 ">
                                    <p className="text-white text-md">
                                        No upcoming campaigns.
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="flex p-4 ml-1">
                            <button className=" font-bold flex items-center p-2 rounded-lg hover:scale-105 duration-300 border-2 border-b-gray-300">
                                View All
                                <div className="ml-2">
                                    <FaArrowRightLong />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <NewPost onClose={handleOnClose} visible={showMyModel} />
        </div>
    );
};

export default Orgdashboard;
