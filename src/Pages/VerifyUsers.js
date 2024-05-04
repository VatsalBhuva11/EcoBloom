import React, { useContext, useEffect, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import face from "../assets/images/face.jpg";
import { ProfileContext } from "../Components/ProfileContextProvider";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { HashLoader } from "react-spinners";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import VideoCard from "./VideoCard.js";
import Loader from "../assets/images/Animation.gif";

export default function VerifyUsers() {
    const navigate = useNavigate();
    const [profile, setProfile] = useContext(ProfileContext);
    const [user, loading, error] = useAuthState(auth);
    const [campaign, setCampaign] = useState({});
    const [users, setUsers] = useState([]);
    const [clickedUserData, setClickedUserData] = useState({});
    const [showMyModal, setShowMyModal] = useState(false);
    const [loader, setLoader] = useState(false);

    const [showVideo, setShowVideo] = useState(false);
    const params = useParams();
    let rejectedUsersCount = 0;

    const handleOnClose = () => setShowMyModal(false);

    useEffect(() => {
        setLoader(true);
        if (auth.currentUser) {
            auth.currentUser.getIdToken().then((idToken) => {
                const idTokenResult = jwtDecode(idToken);
                console.log(idTokenResult);
                if (idTokenResult.role === "user" || !idTokenResult.role) {
                    window.location.replace("/user/dashboard");
                    // <Navigate to = 'org/dashboard'  replace  = {true}/>
                } else {
                    setLoader(false);
                }
            });
            fetch(
                `${process.env.REACT_APP_DEPLOYED_API_URL}/campaign/${params.campaignId}`
            )
                .then((res) => res.json())
                .then(async (data) => {
                    if (data.status === "OK") {
                        setCampaign(data.data);

                        setUsers(data.data.registeredUsers);
                        setLoader(false);
                    } else {
                        console.log("Status not OK");
                        alert(data.message);
                        setLoader(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    alert("Could not fetch campaign info");
                    setLoader(false);
                });
        } else {
            alert("Please login as an organization"); //no protection for org-only route for now.
            setLoader(false);
        }
    }, [loading]);

    function handleUserVerify(userId, userName) {
        console.log("from handleUserVerify: ", userId);

        setClickedUserData({ userId, userName, campaignId: params.campaignId });
        setShowMyModal(true);
        // setShowVideo(!showVideo);
        // fetch(`${process.env.REACT_APP_DEPLOYED_API_URL}/campaign/${params.campaignId}/verify/${userId}`,{
        //     method:"PATCH"
        // }).then(res=>res.json())
        // .then(data=>{
        //     if(data.status==="OK"){
        //         alert("User verified successfully");
        //         window.location.reload();
        //     }else{
        //         alert(data.message);
        //     }
        // }).catch(err=>{
        //     console.log(err);
        //     alert("Error occurred while verifying user");
        // })
    }

    if (loading || loader) {
        return (
            <div className="h-screen flex items-center justify-center">
                <img src={Loader} height={150} width={150}></img>
            </div>
        );
    }
    if (!loading && !user) {
        window.location.replace("/login");
    }

    return (
        <div className="bg-[#fbfbfa] h-screen flex flex-col">
            <div className="flex items-center justify-between p-3">
                <button
                    onClick={() => {
                        navigate(-1);
                    }}
                    className=" hover:scale-100 duration-300 text-3xl p-2"
                >
                    <IoArrowBackSharp />
                </button>
                <p className="text-lg sm:text-2xl md:text-3xl font-bold">
                    Verify Users
                </p>
                <div className="flex items-center mr-4 gap-3">
                    <Link to="/org/edit/profile">
                        <img
                            className="w-9 md:w-12  cursor-pointer hover:scale-105 duration-300 lg:w-14 rounded-full h-9 md:h-12 lg:h-14"
                            src={profile.logo}
                            alt=""
                        />
                    </Link>
                    <p className="hidden sm:flex text-xl font-medium">
                        {profile.name}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-center">
                <div className="flex justify-center items-center rounded-3xl p-8 bg-gradient-to-r from-[#353657] to-[#404162] w-3/4 mt-14">
                    <div className="w-full text-gray-100 border-r-2 border-b-gray-100 p-5">
                        <div className="flex justify-center items-center">
                            Applications Submitted:{" "}
                            {campaign.registeredUsersCount}{" "}
                        </div>
                    </div>
                    <div className="w-full text-gray-100 border-r-2 border-b-gray-100 p-5">
                        <div className="flex justify-center items-center">
                            Applications Accepted:
                            <span id="verifiedUsers">
                                &nbsp;{campaign.verifiedUsersCount}
                            </span>
                        </div>
                    </div>
                    <div className="w-full text-gray-100">
                        <div className="flex justify-center items-center">
                            Applications Remaining:{" "}
                            <span id="remainingUsers">
                                &nbsp;
                                {campaign.registeredUsersCount -
                                    campaign.verifiedUsersCount}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className=" flex flex-col justify-start h-[56%] mt-14">
                <div className="relative overflow-x-hidden overflow-scroll ] rounded-2xl p-6">
                    <table className="w-full text-sm  text-left rtl:text-right border-black ">
                        <thead className=" text-sm bg-gradient-to-r from-[#353657] to-[#404162] ">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-white"
                                >
                                    Name
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-white"
                                >
                                    Email
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-white"
                                >
                                    Phone No.
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-white"
                                >
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <div className="h-full overflow-scroll mb-5 overflow-x-hidden">
                                {users.map((user) => {
                                    console.log("user: ", user);
                                    return (
                                        <tr className="bg-white border-b  hover:bg-gray-50 ">
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                            >
                                                {user.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.phone ? user.phone : "-"}
                                            </td>
                                            <td className="px-6 py-4">
                                                {campaign.verifiedUsers.includes(
                                                    user._id
                                                ) ? (
                                                    <a href="#">
                                                        <button
                                                            disabled
                                                            className="p-4 bg-lime-600 text-white rounded-full text-xs scale-105 duration-300 "
                                                        >
                                                            Verified!
                                                        </button>
                                                    </a>
                                                ) : (
                                                    <a href="#">
                                                        <button
                                                            onClick={() => {
                                                                handleUserVerify(
                                                                    user.firebaseId,
                                                                    user.name
                                                                );
                                                            }}
                                                            className="p-4 bg-[#353657] text-white rounded-full text-xs scale-105 duration-300 "
                                                            id={
                                                                "verify" +
                                                                user.firebaseId
                                                            }
                                                        >
                                                            Verify
                                                        </button>
                                                    </a>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </div>
                        </tbody>
                    </table>
                </div>
            </div>
            <VideoCard
                visible={showMyModal}
                onClose={handleOnClose}
                data={clickedUserData}
            />
        </div>
    );
}

const data = [
    {
        name: "Trace Craven",
        email: "tcraven0@buzzfeed.com",
        phone: "+1 976 311 7776",
    },
    {
        name: "Bail Rennock",
        email: "brennock1@bigcartel.com",
        phone: "+46 464 695 2743",
    },
    {
        name: "Ernest Loos",
        email: "eloos2@yale.edu",
        phone: "+86 448 762 0015",
    },
    {
        name: "Reeva Budleigh",
        email: "rbudleigh3@cdc.gov",
        phone: "+82 970 937 5584",
    },
    {
        name: "Son Weeden",
        email: "sweeden4@newyorker.com",
        phone: "+61 175 105 6841",
    },
    {
        name: "Nat Willock",
        email: "nwillock5@de.vu",
        phone: "+358 634 154 5856",
    },
    {
        name: "Anetta Pugh",
        email: "apugh6@ucla.edu",
        phone: "+355 292 689 9302",
    },
    {
        name: "Nananne Bartlomiej",
        email: "nbartlomiej7@cpanel.net",
        phone: "+504 659 509 6159",
    },
    {
        name: "Ring MacFie",
        email: "rmacfie8@nih.gov",
        phone: "+48 432 655 2231",
    },
    {
        name: "Caldwell Greggor",
        email: "cgreggor9@shop-pro.jp",
        phone: "+48 250 535 9404",
    },
    {
        name: "Tommie Kun",
        email: "tkuna@foxnews.com",
        phone: "+63 417 775 2618",
    },
    {
        name: "Rae Frazer",
        email: "rfrazerb@va.gov",
        phone: "+63 187 988 9296",
    },
    {
        name: "Francesca Knocker",
        email: "fknockerc@cbsnews.com",
        phone: "+63 321 527 4213",
    },
    {
        name: "Cherie Petriello",
        email: "cpetriellod@ox.ac.uk",
        phone: "+86 176 473 1876",
    },
    {
        name: "Hanan Gravells",
        email: "hgravellse@canalblog.com",
        phone: "+54 384 877 8121",
    },
    {
        name: "Reine Burch",
        email: "rburchf@ezinearticles.com",
        phone: "+46 206 719 2837",
    },
    {
        name: "Jesse Bohden",
        email: "jbohdeng@prweb.com",
        phone: "+387 794 987 4653",
    },
    {
        name: "Alair Norvill",
        email: "anorvillh@buzzfeed.com",
        phone: "+1 785 129 3755",
    },
    {
        name: "Reinhold Phipard-Shears",
        email: "rphipardshearsi@people.com.cn",
        phone: "+7 116 764 0632",
    },
    {
        name: "Wyatan MacBey",
        email: "wmacbeyj@businessweek.com",
        phone: "+62 743 343 7671",
    },
];
