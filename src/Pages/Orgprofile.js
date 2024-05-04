import React from "react";
import { useState, useEffect } from "react";
import topleftLogo from "../assets/images/logo.png";
import { IoIosSend } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import PastCampaignsCards from "../Components/PastCampaignsCards";
import { Link } from "react-router-dom";
import CommunityJoinedCard from "./Community_Joined_Card";
import { useAuthState } from "react-firebase-hooks/auth";
import { HashLoader } from "react-spinners";
import { jwtDecode } from "jwt-decode";
import { auth, storage } from "../firebase.js";
import { getDownloadURL, ref } from "firebase/storage";
import { useParams } from "react-router";
import ViewPost from "../Components/ViewPost.js";
import Loader from "../assets/images/Animation.gif";

import moment from "moment";

const Orgprofile = () => {
    const params = useParams();
    const [showMyModel, setShowMyModal] = useState(false);
    const handleOnClose = () => setShowMyModal(false);

    const [status, setStatus] = useState("about");
    const [ifBold1, setIfBold1] = useState("bold");
    const [ifBold2, setIfBold2] = useState("normal");
    const [ifBold3, setIfBold3] = useState("normal");

    const handleABoutChange = () => {
        setIfBold1("bold");
        setIfBold2("normal");
        setIfBold3("normal");
        setStatus("about");
    };

    const handlePastChange = () => {
        setIfBold1("normal");
        setIfBold2("normal");
        setIfBold3("bold");
        setStatus("people");
    };

    const handlePostChange = () => {
        setIfBold1("normal");
        setIfBold2("bold");
        setIfBold3("normal");
        console.log("post page");
        setStatus("post");
    };

    const [user, loading, error] = useAuthState(auth);
    const [joinCommStatus, setJoinCommStatus] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [org, setOrg] = useState({});
    const [logo, setLogo] = useState(null);
    const [banner, setBanner] = useState(null);
    const [loader, setLoader] = useState(true);
    const [posts, setPosts] = useState([]);
    const [showMyModel1, setShowMyModal1] = useState({
        status: false,
        post: {},
    });
    const handleOnClose1 = () => setShowMyModal1(false);

    useEffect(() => {
        if (auth.currentUser) {
            auth.currentUser.getIdTokenResult().then(async (idTokenResult) => {
                try {
                    const data = await Promise.all([
                        await fetch(
                            `${process.env.REACT_APP_DEPLOYED_API_URL}/community/${params.orgId}`
                        ),
                        await fetch(
                            `${process.env.REACT_APP_DEPLOYED_API_URL}/org/${params.orgId}`
                        ),
                    ]);
                    let community = await data[0].json();
                    let org = await data[1].json();

                    community = community.data;
                    org = org.data;
                    console.log("profile se data: ", idTokenResult);
                    const checkJoined = community?.joinedUsers?.filter(
                        (user) =>
                            user.firebaseId === idTokenResult.claims.user_id
                    );
                    checkJoined.length > 0
                        ? setJoinCommStatus(true)
                        : setJoinCommStatus(false);

                    const storageRef1 = ref(storage, org.logo);
                    const storageRef2 = ref(storage, org.banner);
                    const storageData = await Promise.all([
                        getDownloadURL(storageRef1),
                        getDownloadURL(storageRef2),
                    ]);
                    setLogo(storageData[0]);
                    setBanner(storageData[1]);
                    setOrg(org);
                    console.log(org);
                    setLoader(false);
                } catch (err) {
                    console.log(err);
                    // alert("Unable to fetch organization data");
                    // window.location.replace("/user/dashboard");
                }
            });
        } else {
            window.location.replace("/login");
        }
    }, [loading]);

    useEffect(() => {
        if (org?.orgPosts?.length > 0) {
            (async () => {
                const postsPromises = org.orgPosts.map(async (post) => {
                    const storageRef = ref(storage, post.photo);
                    const url = await getDownloadURL(storageRef);
                    return { ...post, photo: url };
                });
                const posts = await Promise.all(postsPromises);
                setPosts(posts);
                console.log(posts);
            })();
        }
    }, [org]);

    const handleJoinCommunity = () => {
        setClicked(true);
        if (auth.currentUser) {
            auth.currentUser.getIdToken().then((idToken) => {
                const idTokenResult = jwtDecode(idToken);
                if (idTokenResult.role !== "user") {
                    setJoinCommStatus(false);
                    setClicked(false);
                    setShowMyModal(true);
                    console.log("Please login as a user first.");
                } else {
                    fetch(
                        `${process.env.REACT_APP_DEPLOYED_API_URL}/community/join/${params.orgId}`,
                        {
                            headers: {
                                authorization: `Bearer ${idToken}`,
                                "Content-Type": "application/json", //important
                            },
                            method: "POST",
                        }
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.status === "OK") {
                                setJoinCommStatus(true);
                                if (data.data.status !== "already registered") {
                                    setShowMyModal(true);
                                }
                            }
                        })
                        .catch((err) => {
                            setJoinCommStatus(false);
                            console.log(err);
                        })
                        .finally(() => {
                            setClicked(false);
                        });
                }
            });
        } else {
            setClicked(false);
            setJoinCommStatus(false);
        }
    };

    if (loading || loader) {
        return (
            <div className="h-screen flex items-center justify-center">
                <img src={Loader} height={200} width={200}></img>
            </div>
        );
    }

    return (
        <div className="flex">
            <div className=" flex flex-col w-full h-screen lg:w-[75%]">
                {/* navbar */}
                <div className="w-full bg-[#0f1035]  text-gray-200 flex shadow-2xl h-[10%] ">
                    <div className="flex items-center ">
                        <Link to="/user/dashboard">
                            <img
                                className="h-12 md:h-16 mt-2"
                                src={topleftLogo}
                                alt=""
                            />
                        </Link>
                        {/* <input
                            type="search"
                            id="default-search"
                            className=" md:ml-2 py-1 px-2 text-md lg:text-xl text-gray-200 rounded-lg bg-[#353657] focus:ring-white focus:border-white w-[250px] md:w-[450px]"
                            placeholder="search"
                        /> */}
                    </div>
                </div>
                {/* navbar */}
                <div className="w-full h-full bg-[#fbfbfa]">
                    <div className="mx-2 flex flex-col bg-[#DFE4C5] rounded-lg">
                        <div className="overflow-hidden">
                            <img
                                className="h-32 sm:h-36 md:h-48 w-full object-cover"
                                src={banner}
                                alt=""
                            />
                        </div>

                        <div className="flex border-b-2 pb-5 border-[#7A7A7A]">
                            <div className="w-[20%] md:w-[15%] overflow-hidden">
                                <img
                                    className="h-16 sm:h-24 md:h-32 mt-[-32px] md:mt-[-48px] pl-4 object-cover absolute"
                                    src={logo}
                                    alt=""
                                />
                            </div>
                            <div className="flex flex-col pt-2 pl-2 md:pl-4 ">
                                <h1 className="text-[#0f1035] md:pt-4 font-bold text-xl sm:text-2xl md:text-4xl">
                                    {org.name}
                                </h1>
                                <p className="text-[14px] sm:text-lg md:text-2xl pt-1 sm:pt-3">
                                    Contact us at: {org.email}
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
                                    {joinCommStatus ? (
                                        <button
                                            onClick={() => {
                                                console.log("u already joined");
                                            }}
                                            className="bg-[#0f1035] bg-opacity-50 flex hover:scale-105 duration-300 text-gray-200 rounded-3xl py-1 px-3 sm:py-1.5 sm:px-6 text-md sm:text-lg md:text-xl sm:gap-3 md:gap-4 font-semibold"
                                        >
                                            Joined
                                        </button>
                                    ) : !clicked ? (
                                        <button
                                            onClick={handleJoinCommunity}
                                            className="bg-[#0f1035] flex hover:scale-105 duration-300 text-gray-200 rounded-3xl py-1 px-3 sm:py-1.5 sm:px-6 text-md sm:text-lg md:text-xl sm:gap-3 md:gap-4 font-semibold"
                                        >
                                            <FaPlus
                                                className="pt-1 sm:flex hidden"
                                                size={28}
                                            />{" "}
                                            Join Community
                                        </button>
                                    ) : (
                                        <button
                                            disabled
                                            className="bg-[#141545] flex hover:scale-105 duration-300 text-gray-200 rounded-3xl py-1 px-3 sm:py-1.5 sm:px-6 text-md sm:text-lg md:text-xl sm:gap-3 md:gap-4 font-semibold"
                                        >
                                            <FaPlus
                                                className="pt-1 sm:flex hidden"
                                                size={28}
                                            />{" "}
                                            Joining...
                                        </button>
                                    )}
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
                        </div>
                    </div>
                    {status === "about" ? (
                        <div className="">
                            <div className="text-center lg:text-2xl text-lg font-semibold mt-5">
                                ABOUT US
                            </div>
                            <div className="h-full mt-4 lg:text-xl text-center text-md ml-2 font-medium p-2">
                                {org.description}
                            </div>
                        </div>
                    ) : status === "post" ? (
                        <div>
                            {posts.length > 0 ? (
                                posts.map((post) => {
                                    return (
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-6">
                                            <div
                                                onClick={() => {
                                                    setShowMyModal1({
                                                        status: true,
                                                        post: post,
                                                    });
                                                }}
                                                className="cursor-pointer flex items-center justify-center"
                                            >
                                                <img
                                                    className="h-full w-full"
                                                    src={post.photo}
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="flex justify-start items-center ml-4 mt-4 text-xl">
                                    No posts yet.
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            {org?.completedCampaigns?.length > 0 ? (
                                org.completedCampaigns.map((campaign) => {
                                    return (
                                        <div className="grid grid-cols-2 gap-5 p-8 place-items-center">
                                            <div className="flex items-center justify-center">
                                                <PastCampaignsCards
                                                    campaign={campaign}
                                                />
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="flex justify-start items-center mt-4 ml-4 text-xl">
                                    No campaigns organised yet.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {/* user profile ends */}
            <div className="hidden lg:flex lg:flex-col lg:w-[25%]">
                <div className="w-full h-screen fixed bg-[#0f1035] text-gray-200 shadow-3xl ">
                    {/* search bar */}

                    <div className="justify-center items-center mt-10 md:ml-4 lg:ml-14"></div>
                    <div className="">
                        <div className="flex items-center cursor-pointer ml-2">
                            <div className="text-[#fbfbfa] lg:text-2xl tex-xl md:mt-4 lg:mt-6  font-semibold">
                                Ongoing Campaigns
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 xl:gap-5 mt-5">
                            {org?.ongoingCampaigns.length > 0 ? (
                                org.ongoingCampaigns.map((campaign) => {
                                    return (
                                        <Link to={"/campaign/" + campaign._id}>
                                            <div className="flex pb-3 items-center  border-b-2 lg:gap-3 xl:gap-7 px-2 ">
                                                <div className="font-bold">
                                                    {moment(
                                                        campaign.endDate
                                                    ).format("lll")}
                                                </div>
                                                <div className="flex flex-col">
                                                    <p className="text-[#fbfbfa] text-[1rem] xl:text-[18px] mt-1 lg:mt-0">
                                                        {campaign.name}
                                                    </p>
                                                    <p className="text-[#fbfbfa] text-[0.75rem]">
                                                        {
                                                            campaign.verifiedUsersCount
                                                        }{" "}
                                                        people attended
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
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
                            <div className="text-[#fbfbfa] lg:text-2xl tex-xl md:mt-4 lg:mt-6  font-semibold">
                                Upcoming Campaigns
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 xl:gap-5 mt-5 ">
                            {org?.upcomingCampaigns.length > 0 ? (
                                org.upcomingCampaigns.map((campaign) => {
                                    return (
                                        <Link to={"/campaign/" + campaign._id}>
                                            <div className="flex pb-3 items-center  border-b-2 lg:gap-3 xl:gap-7 px-2 ">
                                                <div className="font-bold">
                                                    {moment(
                                                        campaign.startDate
                                                    ).format("lll")}
                                                </div>
                                                <div className="flex flex-col">
                                                    <p className="text-[#fbfbfa] text-[1rem] xl:text-[18px] mt-1 lg:mt-0">
                                                        {campaign.name}
                                                    </p>
                                                    <p className="text-[#fbfbfa] text-[0.75rem]">
                                                        {
                                                            campaign.registeredUsersCount
                                                        }{" "}
                                                        people registerd
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
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
                        {/* <div className="flex p-8 ml-10">
                            <button className=" font-bold flex items-center p-2 rounded-lg border-2 border-b-gray-300">
                                View All
                                <div className="ml-2">
                                    <FaArrowRightLong />
                                </div>
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
            <CommunityJoinedCard
                onClose={handleOnClose}
                visible={showMyModel}
            />
            <ViewPost
                onClose={handleOnClose1}
                visible={showMyModel1.status}
                post={showMyModel1.post}
                org={{ name: org.name, logo: logo }}
            />
        </div>
    );
};

export default Orgprofile;
