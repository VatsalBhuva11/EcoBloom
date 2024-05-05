import React, { useEffect, useState } from "react";
// import { Link, Navigate } from "react-router-dom";
import logo from "../assets/images/logo_new.png";
import { RxActivityLog } from "react-icons/rx";
import face from "../assets/images/face.jpg";
import map from "../assets/images/map_img.png";
import { FaArrowRight } from "react-icons/fa6";
import quiz from "../assets/images/Quiz_logo.png";
import store from "../assets/images/Store_logo.png";
import chat from "../assets/images/chat_logo.png";
import User_Dash2 from "./User_Dash2";
import User_dash3 from "./User_dash3";
import Loader from "../assets/images/Animation.gif";
import { ChatContext } from "../Components/ChatContextProvider.js";
import { Link, Navigate } from "react-router-dom";
import moment from "moment";
import { useContext } from "react";
import { ProfileContext } from "../Components/ProfileContextProvider.js";
import Maps_DashBoard from "../Components/Maps_Dashboard.js";
import { auth, storage } from "../firebase.js";
import { getDownloadURL, ref } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import Card_line from "./Card_line";
import banner from "../assets/images/banner1.jpg";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { jwtDecode } from "jwt-decode";
import { MdLocationPin } from "react-icons/md";
import { SlCalender } from "react-icons/sl";

const New_User_Dashboard = () => {
    const [task, setTask] = useState(0);
    // const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    // const [profile, setProfile] = useState(person);
    const [communities, setCommunities] = useState([]);
    const { communities: joinedCommunities } = useContext(ChatContext);
    const [campaigns, setCampaigns] = useState([]);
    const [profile, setProfile] = useContext(ProfileContext);
    const [loader, setLoader] = useState(true);
    const [markers, setMarkers] = useState([]);
    const [ongoingCampaigns, setOngoingCampaigns] = useState([]);
    const [upcomingCampaigns, setUpcomingCampaigns] = useState([]);

    const handleMarkerClick = (marker) => {
        console.log("Marker clicked:", marker);
        // Perform actions when a marker is clicked
    };

    moment().format("MMMM Do YYYY");

    useEffect(() => {
        // setLoader(true);
        if (auth.currentUser) {
            auth.currentUser.getIdToken().then((idToken) => {
                const idTokenResult = jwtDecode(idToken);
                console.log(idTokenResult);
                if (idTokenResult.role === "org") {
                    window.location.replace("/org/dashboard");
                    // <Navigate to = 'org/dashboard'  replace  = {true}/>
                }
                // setLoader(false);
                fetch(`${process.env.REACT_APP_DEPLOYED_API_URL}/campaign`)
                    .then((res) => res.json())
                    .then((campaigns) => {
                        console.log(campaigns);
                        setCampaigns(campaigns.data);
                        let ongoing = [];
                        let upcoming = [];
                        campaigns.data.forEach((campaign) => {
                            const currTime = new Date().toISOString();
                            if (
                                campaign.startDate <= currTime &&
                                campaign.endDate >= currTime
                            ) {
                                ongoing.push(campaign);
                            } else if (campaign.startDate >= currTime) {
                                upcoming.push(campaign);
                            }
                        });
                        setLoader(false);
                        setOngoingCampaigns(ongoing);
                        setUpcomingCampaigns(upcoming);
                        console.log(ongoing);
                        console.log(upcoming);
                        setLoader(false);
                    })
                    .catch((err) => {
                        setLoader(false);
                        console.log(err);
                        throw new Error(
                            "Error occurred while fetching campaigns"
                        );
                    });
            });
        } else {
            window.location.replace("/login");
        }
    }, [loading]);

    useEffect(() => {
        console.log("CURRENT USER: ", auth.currentUser);
        if (auth.currentUser) {
            auth.currentUser
                .getIdTokenResult()
                .then((tokenResult) => {
                    //tokenResult.claims.role === "user" |
                    console.log(tokenResult.claims);
                    if (tokenResult.claims.role === "org") {
                        window.location.replace("/org/dashboard");
                    }
                    return tokenResult.claims.user_id;
                })
                .then((userId) => {
                    Promise.all([
                        fetch(
                            `${process.env.REACT_APP_DEPLOYED_API_URL}/user/${userId}`
                        ),
                        fetch(
                            `${process.env.REACT_APP_DEPLOYED_API_URL}/campaign/upcoming`
                        ),
                    ])
                        .then((responses) => {
                            // responses[0] corresponds to the result of the first fetch
                            // responses[1] corresponds to the result of the second fetch
                            return Promise.all(
                                responses.map((response) => response.json())
                            );
                        })
                        .then((data) => {
                            // data[0] contains the parsed JSON from the first response
                            // data[1] contains the parsed JSON from the second response
                            console.log(data);
                            const storageRef = ref(
                                storage,
                                data[0].data.photoPathFirestore
                            );
                            getDownloadURL(storageRef)
                                .then(async function (url) {
                                    setProfile({
                                        url,
                                        name: data[0].data.name,
                                    });
                                    localStorage.setItem(
                                        "profile",
                                        JSON.stringify({
                                            profileUrl: url,
                                            profileName: data[0].data.name,
                                        })
                                    );
                                    // setName(data[0].data.name);
                                    const comms = data[0].data.communities;
                                    console.log("COMMS: ", comms);
                                    const logoPromises = comms.map((comm) => {
                                        const storageRef = ref(
                                            storage,
                                            comm.organization.banner
                                        );
                                        return getDownloadURL(storageRef);
                                    });
                                    const logoPromisesResolved =
                                        await Promise.all(logoPromises);
                                    const updatedComms = comms.map(
                                        (comm, index) => {
                                            return {
                                                ...comm,
                                                banner: logoPromisesResolved[
                                                    index
                                                ],
                                            };
                                        }
                                    );
                                    setCommunities(updatedComms.slice(0, 3));
                                    console.log(
                                        "updated communities: ",
                                        updatedComms
                                    );
                                    setLoader(false);
                                    setCampaigns(data[1].data.slice(0, 4));
                                    setMarkers(
                                        data[1].data.map((campaign) => {
                                            return {
                                                campaignId: campaign._id,
                                                campaignName: campaign.name,
                                                organizationName:
                                                    campaign.organization.name,
                                                location: {
                                                    lat: campaign.latitude,
                                                    lng: campaign.longitude,
                                                },
                                                startDate: campaign.startDate,
                                                endDate: campaign.endDate,
                                                locationType:
                                                    campaign.locationType,
                                                address: campaign.address,
                                                city: campaign.city,
                                                country: campaign.country,
                                                registeredUsersCount:
                                                    campaign.registeredUsersCount,
                                            };
                                        })
                                    );
                                    console.log(data[1].data);
                                })
                                .catch(function (error) {
                                    console.error(error);
                                });
                        })
                        .catch((err) => {
                            console.error(
                                "ERROR WHILE FETCHING USER DATA: ",
                                err
                            );
                        });
                })
                .catch((err) => {
                    console.error("ERROR IN auth.currentUser: ", err);
                });
        } else {
            window.location.replace("/login");
        }
    }, [loading]);

    const [search, setSearch] = useState("");
    if (loading || loader) {
        return (
            <div className="h-screen flex items-center justify-center">
                <img src={Loader} height={200} width={200}></img>
            </div>
        );
    }
    if (!loading && !user) {
        window.location.replace("/login");
    }
    return (
        <div>
            <div className="h-screen bg-[#277868]">
                <div className="w-full bg-[#277868] text-white flex justify-between h-[8%] shadow-2xl mb-2">
                    <div className="flex items-center justify-center">
                        <Link to="/">
                            <img
                                className="hover:scale-105 duration-300 md:h-14 ml-2"
                                src={logo}
                                alt=""
                            />
                        </Link>
                        <div className="ml-5 xl:m-6 text-2xl font-bold hidden xl:flex">
                            USER DASHBOARD
                        </div>
                        <a className="flex items-center sm:text-2xl md:text-3xl lg:text-3xl mx-5 xl:mx-8 sm:mx-7 lg:mx-6 gap-1 sm:gap-2 lg:gap-3 cursor-pointer">
                            <Link to="/log">
                                <div className="flex items-center  hover:text-blue-400 text-[1.23rem] md:text-3xl lg:text-xl sm:flex">
                                    <div className="text-2xl text-white mr-2">
                                        <RxActivityLog />
                                    </div>
                                    <div className="mb-2 hidden lg:flex mt-2">
                                        Activity Log
                                    </div>
                                </div>{" "}
                            </Link>
                        </a>
                    </div>
                    <div className="flex justify-end items-center text-2xl sm:text-2xl md:text-3xl mr-1">
                        <div className="flex mx-3 sm:mx-4 lg:mx-6 items-center">
                            <Link to="/user/profile">
                                <img
                                    className="w-[60px] h-[60px] rounded-full hover:scale-110 cursor-pointer duration-300 my-1"
                                    src={profile.url}
                                    alt=""
                                />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex w-full h-[87%]">
                    <div className="h-full ml-1 overflow-hidden w-[75%]">
                        <Maps_DashBoard
                            markers={markers}
                            onMarkerClick={handleMarkerClick}
                        />
                    </div>
                    <div className="h-full w-[25%] flex flex-col justify-around">
                        <div className="m-1 h-[33%] bg-gradient-to-br from-[#407D71] to-[#064236] rounded-lg flex">
                            <div className="w-[50%] h-full ml-3 flex flex-col justify-center gap-4">
                                <div className=" flex flex-col">
                                    <p className="text-3xl text-[#EADBDB] font-semibold">
                                        ANSWER
                                    </p>
                                    <p className="text-3xl text-[#EADBDB] font-semibold">
                                        & EARN
                                    </p>
                                    <p className="text-md text-[#68E665]">
                                        DAILY CHALLENGE
                                    </p>
                                </div>
                                <Link to="/quiz">
                                    <button className="bg-[#244942] rounded-3xl w-[70%]">
                                        <div className="flex items-center justify-center text-[#D7D7D7] text-[1.1rem]">
                                            <div className="">QUIZ</div>
                                            <div className="">
                                                <FaArrowRight />
                                            </div>
                                        </div>
                                    </button>
                                </Link>
                            </div>
                            <div className="w-[60%] h-full flex justify-between items-center">
                                <img src={quiz} className="" />
                            </div>
                        </div>
                        <div className="m-1 h-[33%] bg-gradient-to-br from-[#407D71] to-[#064236] rounded-lg flex">
                            <div className="w-[50%] h-full ml-3 flex flex-col justify-center gap-4">
                                <div className=" flex flex-col">
                                    <p className="text-3xl text-[#EADBDB] font-semibold">
                                        EXPLORE
                                    </p>
                                    <p className="text-3xl text-[#EADBDB] font-semibold">
                                        OUR STORE
                                    </p>
                                    <p className="text-md text-[#68E665]">
                                        6 ITEMS
                                    </p>
                                </div>
                                <Link to="/store">
                                    <button className="bg-[#244942] rounded-3xl w-[70%]">
                                        <div className="flex items-center justify-center text-[#D7D7D7] text-[1.1rem]">
                                            <div className="">STORE</div>
                                            <div className="">
                                                <FaArrowRight />
                                            </div>
                                        </div>
                                    </button>
                                </Link>
                            </div>
                            <div className="w-[60%] h-full flex justify-between items-center ">
                                <img src={store} className="" />
                            </div>
                        </div>
                        <div className="m-1 h-[33%] bg-gradient-to-br from-[#407D71] to-[#064236] rounded-lg flex">
                            <div className="w-[50%] h-full ml-3 flex flex-col justify-center gap-4">
                                <div className=" flex flex-col">
                                    <p className="text-3xl text-[#EADBDB] font-semibold">
                                        CHAT WITH
                                    </p>
                                    <p className="text-3xl text-[#EADBDB] font-semibold">
                                        OTHERS
                                    </p>
                                </div>
                                <button
                                    className="bg-[#244942] rounded-3xl w-[70%]"
                                    onClick={() => {
                                        if (joinedCommunities.length > 0) {
                                            window.location.href = "/chat";
                                        } else {
                                            alert(
                                                "Please join a community first!"
                                            );
                                        }
                                    }}
                                >
                                    <div className="flex items-center justify-center text-[#D7D7D7] text-[1.1rem]">
                                        <div className="">CHAT</div>
                                        <div className="">
                                            <FaArrowRight />
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <div className="w-[60%] h-full flex justify-between items-center ">
                                <img src={chat} className="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-full">
                <div className="relative bottom-8 bg-[#277868] pt-[1.3rem] pb-[10.3rem] h-[15rem]">
                    <div className="text-4xl flex justify-center font-semibold text-[#D1D1D1] pb-[2.6rem]">
                        JOINED COMMUNITITES
                    </div>
                    <div className="relative w-full flex justify-around px-12">
                        {communities ? (
                            communities.map((community, key) => (
                                <a
                                    className="bg-gradient-to-br from-[#407D71] to-[#064236] flex-col rounded-lg pb-4 h-[12.5rem] w-[30%]"
                                    key={key}
                                    href={
                                        "/org/profile/" +
                                        community.organization.firebaseId
                                    }
                                >
                                    <div className="w-[100%] h-[8.5rem] rounded-xl relative bg-cover">
                                        <img
                                            className="rounded-xl object-cover object-top h-full w-full"
                                            src={community.banner}
                                            alt=""
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-xl lg:text-xl font-semibold text-[#FBFBFA]">
                                            {community.orgName}
                                        </div>
                                        <div className="text-sm text-[#FBFBFA]">
                                            {community.userCount} Members
                                        </div>
                                    </div>
                                </a>
                            ))
                        ) : (
                            <div className="text-4xl flex justify-center font-semibold text-[#d85f5f]">
                                NO JOINED COMMUNITITES
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-[4rem] flex justify-end pr-6 pt-1">
                    <Link to="/user/orgs">
                        <button className="text-[#277868] px-3 py-1 mr-12 border-2 border-[#277868] text-lg rounded-md hover:shadow-xl mt-1">
                            <div className="flex items-center gap-1 font-semibold">
                                View All <FaArrowRightLong />
                            </div>
                        </button>
                    </Link>
                </div>
                <div className="flex justify-center pr-6 pt-1 pb-3">
                    <Link to="/user/join">
                        <button className="bg-[#277868] text-[#FBFBFA] px-3 py-1 border border-[#277868] text-xl font-semibold rounded-md hover:shadow-xl">
                            <div className="flex items-center gap-1">
                                <FaPlus /> Join Community
                            </div>
                        </button>
                    </Link>
                </div>
            </div>
            <div className="h-screen w-full px-8 py-6">
                <div className="h-[100%] w-[100%] border border-[#277868] rounded-lg pl-5">
                    <div className="flex gap-8 text-xl text-[#277868] font-semibold py-4">
                        <button
                            className={
                                task === 0
                                    ? "font-semibold px-7 py-1 rounded-lg bg-[#E1E1E0]"
                                    : "font-semibold px-7 py-1 rounded-lg"
                            }
                            // "font-semibold px-7 py-1 rounded-lg bg-[#E1E1E0]"
                            onClick={() => {
                                setTask(0);
                            }}
                        >
                            ONGOING CAMPAIGNS
                        </button>
                        <button
                            className={
                                task === 1
                                    ? "font-semibold px-7 py-1 rounded-lg bg-[#E1E1E0]"
                                    : "font-semibold px-7 py-1 rounded-lg"
                            }
                            onClick={() => {
                                setTask(1);
                            }}
                        >
                            UPCOMING CAMPAIGNS
                        </button>
                        <button
                            className={
                                task === 2
                                    ? "font-semibold px-7 py-1 rounded-lg bg-[#E1E1E0]"
                                    : "font-semibold px-7 py-1 rounded-lg"
                            }
                            onClick={() => {
                                setTask(2);
                            }}
                        >
                            PAST CAMPAIGNS
                        </button>
                    </div>
                    <div className="w-full mr-4">
                        <input
                            onChange={(e) =>
                                setSearch(e.target.value.toLowerCase())
                            }
                            // onChange={(e) => setSearch(e.target.value.toLowerCase())}
                            type="text"
                            className="h-11 rounded-2xl border-[1.5px] border-[#277868] w-[98%] px-3 text-[#277868]"
                            placeholder="🔍"
                        />
                    </div>
                    <div className="h-[90%] overflow-scroll overflow-x-hidden">
                        {task === 0 ? (
                            <>
                                {ongoingCampaigns.map((campaign) => {
                                    return (
                                        <div className="flex justify-between pr-10 py-3">
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <img
                                                        src={banner}
                                                        alt=""
                                                        className="h-[7rem] w-[15rem] object-cover rounded-lg"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <div className="text-[#277868] text-2xl font-semibold">
                                                        {campaign.name}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-[#277868] text-xl">
                                                        <MdLocationPin />{" "}
                                                        {campaign.city},{" "}
                                                        {campaign.country}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-[#686968] text-xl font-semibold">
                                                        <SlCalender />{" "}
                                                        {moment(
                                                            campaign.startDate
                                                        ).format("lll")}{" "}
                                                        -{" "}
                                                        {moment(
                                                            campaign.endDate
                                                        ).format("lll")}
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <button
                                                    onClick={() => {
                                                        window.location.href = `/campaign/${campaign._id}`;
                                                    }}
                                                    className="px-3 py-1 text-[#EEEEEE] bg-[#277868] text-lg rounded-lg mr-3 hover:shadow-xl"
                                                >
                                                    EXPLORE
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        ) : (
                            <div></div>
                        )}
                        {task === 1 ? (
                            <>
                                {upcomingCampaigns.map((campaign) => {
                                    return (
                                        <div className="flex justify-between pr-10 py-3">
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <img
                                                        src={banner}
                                                        alt=""
                                                        className="h-[7rem] w-[15rem] object-cover rounded-lg"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <div className="text-[#277868] text-2xl font-semibold">
                                                        {campaign.name}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-[#277868] text-xl">
                                                        <MdLocationPin />{" "}
                                                        {campaign.city},{" "}
                                                        {campaign.country}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-[#686968] text-xl font-semibold">
                                                        <SlCalender />{" "}
                                                        {moment(
                                                            campaign.startDate
                                                        ).format("lll")}{" "}
                                                        -{" "}
                                                        {moment(
                                                            campaign.endDate
                                                        ).format("lll")}
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <button
                                                    onClick={() => {
                                                        window.location.href = `/campaign/${campaign._id}`;
                                                    }}
                                                    className="px-3 py-1 text-[#EEEEEE] bg-[#277868] text-lg rounded-lg mr-3 hover:shadow-xl"
                                                >
                                                    EXPLORE
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        ) : (
                            <div></div>
                        )}
                        {task === 2 ? (
                            <>
                                <Card_line />
                            </>
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default New_User_Dashboard;
