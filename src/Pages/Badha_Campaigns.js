import React, { useContext, useState, useEffect } from "react";
import logo_new from "../assets/images/logo_new.png";
import face from "../assets/images/face.jpg";
import banner from "../assets/images/banner.png";
import logo_commu from "../assets/images/logo_commu.jpg";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { Link, Navigate } from "react-router-dom";
import { ProfileContext } from "../Components/ProfileContextProvider";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";
import { jwtDecode } from "jwt-decode";
import { HashLoader } from "react-spinners";

const Badha_Campaigns = () => {
    const [profile, setProfile] = useContext(ProfileContext);
    const [campaigns, setCampaigns] = useState([]);
    const [ongoingCampaigns, setOngoingCampaigns] = useState([]);
    const [upcomingCampaigns, setUpcomingCampaigns] = useState([]);
    const [loader, setLoader] = useState(true);
    const [user, loading, error] = useAuthState(auth);

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

    if (loading || loader) {
        return (
            <div className="h-screen flex items-center justify-center">
                <HashLoader color="#36d7b7" size={100} />
            </div>
        );
    }

    return (
        <div className="h-screen w-full bg-[#eef0e5]">
            <div className="flex items-center justify-between ">
                <Link to="/">
                    <img
                        className="w-16 md:w-20 lg:w-24  cursor-pointer ml-2 hover:scale-105 duration-300 mt-1"
                        src={logo_new}
                        alt=""
                    />
                </Link>
                <div className="flex items-center mr-4 gap-3">
                    <Link to="/user/profile">
                        <img
                            className="w-9 md:w-12 lg:w-14 h-9 hover:scale-105 duration-300 md:h-12 lg:h-14 rounded-full"
                            src={profile.url}
                            alt=""
                        />
                    </Link>
                    <p className="hidden sm:flex text-xl font-medium">
                        {profile.name}
                    </p>
                </div>
            </div>
            <div className="flex flex-col mt-2 mx-5 gap-2">
                <div className="font-bold text-2xl text-[#4D8E11]">
                    Ongoing Campaigns
                </div>
                <div className="w-full flex flex-row overflow-scroll gap-24 overflow-y-hidden pb-2 pl-12">
                    {ongoingCampaigns.map((campaign) => {
                        return (
                            <div className="w-[20.5rem] lg:w-[24.5rem] bg-[#DFE4C5] flex flex-col justify-between rounded-lg h-64 lg:pb-4">
                                <div className="flex flex-col">
                                    <div className="w-[21.5rem] lg:w-[24.5rem] h-20 p-2 overflow-hidden">
                                        <img
                                            className="rounded-xl bg-cover"
                                            src={banner}
                                            alt=""
                                        />
                                    </div>
                                    <div className=" ml-4">
                                        <div className="text-lg lg:text-xl font-medium">
                                            {campaign.name}
                                        </div>
                                        <div>{campaign.organization.name}</div>
                                        <div className="text-xs">
                                            {campaign.registeredUsersCount}{" "}
                                            Members
                                        </div>
                                        <div className="flex items-center gap-1 text-[#2a7805] font-bold">
                                            <FaLocationDot />
                                            {campaign.city}, {campaign.country}
                                        </div>
                                        <div className="flex items-center gap-1 text-[#2a7805] text-sm">
                                            <SlCalender />
                                            {moment(campaign.startDate).format(
                                                "lll"
                                            )}{" "}
                                            -{" "}
                                            {moment(campaign.endDate).format(
                                                "lll"
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex justify-end pr-3 mb-3 lg:mb-0">
                                    <button
                                        onClick={() => {
                                            window.location.href =
                                                "/campaign/" + campaign._id;
                                        }}
                                        className="w-36 h-7 text-[16px] text-[#eef0e5] rounded-3xl bg-[#0F1035] hover:scale-105 duration-200 flex justify-center gap-1"
                                    >
                                        See Profile{" "}
                                        <div className="text-md mt-[0.34rem]">
                                            {" "}
                                            <FaArrowRightLong />{" "}
                                        </div>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="flex flex-col mt-2 mx-5 gap-2">
                <div className="font-bold text-2xl text-[#768469]">
                    Upcoming Campaigns
                </div>
                <div className="w-full h-60 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-content-between overflow-scroll overflow-x-hidden gap-y-4 pl-12">
                    {/* div for upcming card */}
                    {upcomingCampaigns.map((campaign) => {
                        return (
                            <div className="w-[20.5rem] lg:w-[24.5rem] bg-[#DFE4C5] flex flex-col justify-between rounded-lg h-64 lg:pb-4">
                                <div className="flex flex-col">
                                    <div className="w-[21.5rem] lg:w-[24.5rem] h-20 p-2 overflow-hidden">
                                        <img
                                            className="rounded-xl bg-cover"
                                            src={banner}
                                            alt=""
                                        />
                                    </div>
                                    <div className=" ml-4">
                                        <div className="text-lg lg:text-xl font-medium">
                                            {campaign.name}
                                        </div>
                                        <div>{campaign.organization.name}</div>
                                        <div className="text-xs">
                                            {campaign.registeredUsersCount}{" "}
                                            Members
                                        </div>
                                        <div className="flex items-center gap-1 text-[#768469] font-bold">
                                            <FaLocationDot />
                                            {campaign.city}, {campaign.country}
                                        </div>
                                        <div className="flex items-center gap-1 text-[#768469] text-sm">
                                            <SlCalender />
                                            {moment(campaign.startDate).format(
                                                "lll"
                                            )}{" "}
                                            -{" "}
                                            {moment(campaign.endDate).format(
                                                "lll"
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex justify-end pr-3 mb-3 lg:mb-0">
                                    <button
                                        onClick={() => {
                                            window.location.href =
                                                "/campaign/" + campaign._id;
                                        }}
                                        className="w-36 h-7 text-[16px] text-[#eef0e5] rounded-3xl bg-[#0F1035] hover:scale-105 duration-200 flex justify-center gap-1"
                                    >
                                        See Profile{" "}
                                        <div className="text-md mt-[0.34rem]">
                                            {" "}
                                            <FaArrowRightLong />{" "}
                                        </div>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Badha_Campaigns;
