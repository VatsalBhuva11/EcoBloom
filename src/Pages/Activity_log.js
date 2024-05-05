import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import logo1 from "../assets/images/banner.png";
import logo3 from "../assets/images/logo3.png";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { jwtDecode } from "jwt-decode";
import { HashLoader } from "react-spinners";
import moment from "moment";
import Loader from "../assets/images/Animation.gif";


const Activity_log = () => {
    const [activities, setActivities] = useState([]);
    const [user, loading, error] = useAuthState(auth);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        if (auth.currentUser) {
            auth.currentUser.getIdToken().then((idToken) => {
                const idTokenResult = jwtDecode(idToken);
                if (idTokenResult.role === "org") {
                    window.location.replace("/org/dashboard");
                }
                fetch(
                    `${process.env.REACT_APP_DEPLOYED_API_URL}/user/${idTokenResult.user_id}/activity`
                )
                    .then((res) => res.json())
                    .then((activities) => {
                        setActivities(activities.data);
                        console.log(activities);
                        setLoader(false);
                    });
            });
        }
    }, [loading]);

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
        <div className=' bg-[#fbfbfa] w-screen h-screen'>
            <div className="flex items-center gap-5 text-[#0F1035] ml-5 pt-2">
                <Link
                    to="/user/dashboard"
                    className="mb-1 lg:mb-4 text-xl sm:text-2xl lg:text-3xl mt-1 sm:mt-1 lg:mt-2 cursor-pointer hover:scale-110 duration-300"
                >
                    <FaArrowLeft />
                </Link>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                    ACTIVITY LOG
                </div>
            </div>
            <div className="px-10 flex flex-col gap-4 mt-5 h-[85%] overflow-scroll overflow-x-hidden">
                {activities.map((activity) => {
                    return (
                        <div className="flex items-center gap-2 w-full bg-[#DFE4C5] p-2 rounded-2xl justify-between">
                            <div className="flex gap-2 items-center">
                                <img
                                    src={
                                        activity.type ===
                                        "registeredForCampaign"
                                            ? logo3
                                            : // activity.type === "joinedCommunity" ||
                                              // activity.type ===
                                              //     "verifiedForCampaign" ||
                                              // activity.type === "completedCampaign"
                                              //     ? logo1
                                              //     :
                                              logo1
                                    }
                                    className="w-8 h-7 sm:w-12 sm:h-10 xl:w-16 xl:h-12 rounded-full"
                                    alt=""
                                />
                                <div className=" text-sm sm:text-lg lg:text-xl font-medium">
                                    {activity.content}
                                </div>
                            </div>
                            <div className="text-xs  lg:text-sm 2xl:text-base mr-1">
                                {moment(activity.date).format(
                                    "MMMM Do YYYY, h:mm:ss a"
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Activity_log;
