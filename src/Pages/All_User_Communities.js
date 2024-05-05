import React, { useContext, useEffect, useState } from "react";
import logo_new from "../assets/images/logo_new.png";
import face from "../assets/images/face.jpg";
import banner from "../assets/images/banner1.jpg";
import logo_commu from "../assets/images/logo_commu.jpg";
import { FaArrowRightLong } from "react-icons/fa6";
import { ProfileContext } from "../Components/ProfileContextProvider.js";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { jwtDecode } from "jwt-decode";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage } from "../firebase.js";
import { getDownloadURL, ref } from "firebase/storage";
import Loader from "../assets/images/Animation.gif";
import { ChatContext } from "../Components/ChatContextProvider.js";

const All_User_Communitites = () => {
    const [search, setSearch] = useState("");
    const [profile, setProfile] = useContext(ProfileContext);
    const [orgs, setOrgs] = useState([]);
    //const [loading, setLoading] = useState(true);
    const [loader, setLoader] = useState(true);
    const [user, loading, error] = useAuthState(auth);
    // const [profile, setProfile] = useState(pers
    const [communities, setCommunities] = useState([]);
    const { communities: joinedCommunities } = useContext(ChatContext);

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
                                    setCommunities(updatedComms);
                                    console.log(
                                        "updated communities: ",
                                        updatedComms
                                    );
                                    setLoader(false);
                                    // setCampaigns(data[1].data.slice(0, 4));
                                    // setMarkers(
                                    //   data[1].data.map((campaign) => {
                                    //     return {
                                    //       campaignId: campaign._id,
                                    //       campaignName: campaign.name,
                                    //       organizationName: campaign.organization.name,
                                    //       location: {
                                    //         lat: campaign.latitude,
                                    //         lng: campaign.longitude,
                                    //       },
                                    //       startDate: campaign.startDate,
                                    //       endDate: campaign.endDate,
                                    //       locationType: campaign.locationType,
                                    //       address: campaign.address,
                                    //       city: campaign.city,
                                    //       country: campaign.country,
                                    //       registeredUsersCount: campaign.registeredUsersCount,
                                    //     };
                                    //   })
                                    // );
                                    // console.log(data[1].data);
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

    if (loading || loader) {
        return (
            <div className="h-screen flex items-center justify-center">
                <img src={Loader} height={200} width={200}></img>
            </div>
        );
    }

    return (
        <div className="h-screen w-full bg-[#eef0e5]">
            <div className="flex items-center justify-between ">
                <img
                    onClick={() => {
                        window.location.href = "/user/dashboard";
                    }}
                    className="hover:scale-105 duration-150 cursor-pointer w-20 md:w-28 lg:w-32 ml-2 mt-1"
                    src={logo_new}
                    alt=""
                />
                <p className="text-lg sm:text-2xl md:text-3xl font-bold">
                    JOINED COMMUNITIES
                </p>
                <div className="flex items-center mr-4 gap-3">
                    <img
                        className="w-9 md:w-12 lg:w-14 rounded-full"
                        src={profile.url}
                        alt=""
                    />
                    <p className="hidden sm:flex text-xl font-medium">
                        {profile.name}
                    </p>
                </div>
            </div>
            <div className="mx-8 my-3">
                <input
                    onChange={(e) => setSearch(e.target.value.toLowerCase())}
                    type="text"
                    className="w-full h-10 rounded-2xl px-4"
                    placeholder="🔍 Search For Communities"
                />
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 p-7 place-items-start justify-items-center gap-y-7 h-[83%] md:h-[80%] lg:h-[79%] overflow-scroll overflow-x-hidden">
                {communities ? (
                    communities
                        .filter((community) => {
                            return search.toLowerCase() === ""
                                ? community
                                : community.orgName
                                      .toLowerCase()
                                      .includes(search);
                        })
                        .map((community, key) => (
                            <a
                                className="bg-gradient-to-br from-[#407D71] to-[#064236] flex-col rounded-lg pb-4 h-[12.5rem] w-[80%]"
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
                    <div></div>
                )}
            </div>
        </div>
    );
};

export default All_User_Communitites;
