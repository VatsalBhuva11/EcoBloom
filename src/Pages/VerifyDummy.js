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
import logo from "../assets/images/logo.png";
import Loader from "../assets/images/Animation.gif";


const VerifyDummy = () => {
    const [search, setSearch] = useState("");
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
                <img src={Loader} height={200} width={200}></img>
            </div>
        );
    }


    if (!loading && !user) {
        window.location.replace("/login");
    }

    return (
        <div className="bg-[#fbfbfa] h-screen flex flex-col ">
            <div className="flex items-center w-screen md:pt-6">
                <div className="w-1/3">
                    <Link to="/">
                        <img
                            className="h-16 hover:scale-105 duration-300 mt-4 "
                            src={logo}
                            alt=""
                        />
                    </Link>
                </div>
                <div className="w-1/3 flex justify-center">
                    <p className="text-lg sm:text-2xl md:text-3xl font-bold text-[#277868] pt-2">
                        VERIFY USERS
                    </p>
                </div>
                <div className="flex items-center justify-end w-1/3 mr-4 gap-3">
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
                <div className="flex justify-center items-center rounded-3xl px-2 py-1 sm:p-2 md:p-4 bg-[#277868] w-3/4 mt-4 md:mt-8">
                    <div className="w-full text-gray-100 border-r-2 border-b-gray-100 p-2 md:text-[20px] sm:text-[15px] text-[10px]">
                        <div className="flex justify-center">
                            <p>Submitted: </p>
                            <p className="pl-2 text-gray-100">
                                {campaign.registeredUsersCount}
                            </p>
                        </div>
                    </div>
                    <div className="w-full text-gray-100 border-r-2 border-b-gray-100 p-2 md:text-[20px] sm:text-[15px] text-[10px]">
                        <div className="flex justify-center">
                            <p>Accepted: </p>
                            <p
                                className="pl-2 text-gray-100"
                                id="verifiedUsers"
                            >
                                {campaign.verifiedUsersCount}
                            </p>
                        </div>
                    </div>
                    <div className="w-full text-gray-100 border-b-gray-100 p-2  md:text-[20px] sm:text-[15px] text-[10px]">
                        <div className="flex justify-center">
                            <p>Remaining: </p>
                            <p
                                className="pl-2 text-gray-100"
                                id="remainingUsers"
                            >
                                {campaign.registeredUsersCount -
                                    campaign.verifiedUsersCount}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 


      search */}
            <div className="mx-8 my-3 mt-8 flex justify-center items-center">
                <input
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    className="h-10 w-full rounded-2xl px-4"
                    placeholder="🔍 Search For Communities"
                />
            </div>
            <div className="flex items-center justify-center font-semibold ">
                <div className="flex justify-center items-center rounded-xl p-1 md:p-2 bg-[#277868] w-11/12 mt-2 md:mt-2">
                    <div className="w-full text-gray-100 border-r-2 border-b-gray-700 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
                        <div className="flex justify-center">
                            <p>Name </p>
                        </div>
                    </div>
                    <div className="w-full text-gray-100 border-r-2 border-b-gray-700 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
                        <div className="flex justify-center">
                            <p>Email </p>
                        </div>
                    </div>
                    <div className="w-full text-gray-100 border-r-2 border-b-gray-700 p-2  md:text-[20px] sm:text-[15px] text-[13px]">
                        <div className="flex justify-center">
                            <p>Phone No </p>
                        </div>
                    </div>
                    <div className="w-full text-gray-100  border-b-gray-700 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
                        <div className="flex justify-center">
                            <p>Status </p>
                        </div>
                    </div>
                </div>
            </div>

            {users
                .filter((user) => {
                    return search.toLowerCase() === ""
                        ? user
                        : user.name.toLowerCase().includes(search);
                })
                .map((user) => {
                    //  console.log("user credentials" , user);
                    //  console.log(user.name);
                    console.log("user: ", user);
                    return (
                        <div className="flex items-center justify-center  ">
                            <div className="flex justify-center items-center rounded-xl p-1 md:p-2 bg-[#D7E6E3] w-11/12 mt-3 md:mt-4">
                                <div className="w-full text-[#277868] border-r-2 border-gray-500 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
                                    <div className="flex justify-center">
                                        <p className="font-semibold">
                                            {" "}
                                            {user.name}{" "}
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full text-[#277868] border-r-2 border-gray-500 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
                                    <div className="flex justify-center">
                                        <p>{user.email}</p>
                                    </div>
                                </div>
                                <div className="w-full text-[#277868] border-r-2 border-gray-500 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
                                    <div className="flex justify-center">
                                        <p> {user.phone ? user.phone : "-"}</p>
                                    </div>
                                </div>
                                <div className="w-full flex justify-center text-gray-700 p-2  md:text-[20px] sm:text-[15px] text-[13px]">
                                    {campaign.verifiedUsers.includes(
                                        user._id
                                    ) ? (
                                        <a href="#">
                                            <button className="hover:scale-105 duration-300  bg-[#277868] text-[#edede3] w-32 h-8 rounded-2xl  font-medium text-[14px]">
                                                VERIFIED
                                            </button>
                                        </a>
                                    ) : (
                                        <a href="#">
                                            <button
                                                className="hover:scale-105 duration-300  bg-[#BEBA6B] text-[#edede3] w-32 h-8 rounded-2xl  font-medium text-[14px]"
                                                onClick={() => {
                                                    handleUserVerify(
                                                        user.firebaseId,
                                                        user.name
                                                    );
                                                }}
                                                id={"verify" + user.firebaseId}
                                            >
                                                REVIEW
                                            </button>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}

            {/* <div className="flex items-center justify-center  ">
        <div className="flex justify-center items-center rounded-xl p-1 md:p-2 bg-[#E4E8D3] w-11/12 mt-3 md:mt-4">
          <div className="w-full text-gray-700 border-r-2 border-gray-500 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
            <div className="flex justify-center">
              <p className="font-semibold">Andrew Joe </p>
            </div>
          </div>
          <div className="w-full text-gray-700 border-r-2 border-gray-500 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
            <div className="flex justify-center">
              <p>andrew31@gmail.com</p>
            </div>
          </div>
          <div className="w-full text-gray-700 border-r-2 border-gray-500 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
            <div className="flex justify-center">
              <p>+91 9330054075</p>
            </div>
          </div>
          <div className="w-full flex justify-center text-gray-700 p-2  md:text-[20px] sm:text-[15px] text-[13px]">
            <button className="hover:scale-105 duration-300  bg-[#6BBE7D] text-[#edede3] w-32 h-8 rounded-2xl  font-medium text-[14px]">
              VERIFIED
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center  ">
        <div className="flex justify-center items-center rounded-xl p-1 md:p-2 bg-[#E4E8D3] w-11/12 mt-3 md:mt-4">
          <div className="w-full text-gray-700 border-r-2 border-gray-500 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
            <div className="flex justify-center">
              <p className="font-semibold">Andrew Joe </p>
            </div>
          </div>
          <div className="w-full text-gray-700 border-r-2 border-gray-500 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
            <div className="flex justify-center">
              <p>andrew31@gmail.com</p>
            </div>
          </div>
          <div className="w-full text-gray-700 border-r-2 border-gray-500 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
            <div className="flex justify-center">
              <p>+91 9330054075</p>
            </div>
          </div>
          <div className="w-full flex justify-center text-gray-700 p-2  md:text-[20px] sm:text-[15px] text-[13px]">
            <button className="hover:scale-105 duration-300  bg-[#6BBE7D] text-[#edede3] w-32 h-8 rounded-2xl  font-medium text-[14px]">
              VERIFIED
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center  ">
        <div className="flex justify-center items-center rounded-xl p-1 md:p-2 bg-[#E4E8D3] w-11/12 mt-3 md:mt-4">
          <div className="w-full text-gray-700 border-r-2 border-gray-500 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
            <div className="flex justify-center">
              <p className="font-semibold">Andrew Joe </p>
            </div>
          </div>
          <div className="w-full text-gray-700 border-r-2 border-gray-500 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
            <div className="flex justify-center">
              <p>andrew31@gmail.com</p>
            </div>
          </div>
          <div className="w-full text-gray-700 border-r-2 border-gray-500 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
            <div className="flex justify-center">
              <p>+91 9330054075</p>
            </div>
          </div>
          <div className="w-full flex justify-center text-gray-700 p-2  md:text-[20px] sm:text-[15px] text-[13px]">
            <button className="hover:scale-105 duration-300  bg-[#6BBE7D] text-[#edede3] w-32 h-8 rounded-2xl  font-medium text-[14px]">
              VERIFIED
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center  ">
        <div className="flex justify-center items-center rounded-xl p-1 md:p-2 bg-[#E4E8D3] w-11/12 mt-3 md:mt-4">
          <div className="w-full text-gray-700 border-r-2 border-gray-500 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
            <div className="flex justify-center">
              <p className="font-semibold">Andrew Joe </p>
            </div>
          </div>
          <div className="w-full text-gray-700 border-r-2 border-gray-500 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
            <div className="flex justify-center">
              <p>andrew31@gmail.com</p>
            </div>
          </div>
          <div className="w-full text-gray-700 border-r-2 border-gray-500 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
            <div className="flex justify-center">
              <p>+91 9330054075</p>
            </div>
          </div>
          <div className="w-full flex justify-center text-gray-700 p-2  md:text-[20px] sm:text-[15px] text-[13px]">
            <button className="hover:scale-105 duration-300  bg-[#BEBA6B] text-[#edede3] w-32 h-8 rounded-2xl  font-medium text-[14px]">
              REVIEW
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center  ">
        <div className="flex justify-center items-center rounded-xl p-1 md:p-2 bg-[#E4E8D3] w-11/12 mt-3 md:mt-4">
          <div className="w-full text-gray-700 border-r-2 border-gray-500 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
            <div className="flex justify-center">
              <p className="font-semibold">Andrew Joe </p>
            </div>
          </div>
          <div className="w-full text-gray-700 border-r-2 border-gray-500 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
            <div className="flex justify-center">
              <p>andrew31@gmail.com</p>
            </div>
          </div>
          <div className="w-full text-gray-700 border-r-2 border-gray-500 p-2 md:text-[20px] sm:text-[15px] text-[13px]">
            <div className="flex justify-center">
              <p>+91 9330054075</p>
            </div>
          </div>
          <div className="w-full flex justify-center text-gray-700 p-2  md:text-[20px] sm:text-[15px] text-[13px]">
            <button className="bg-[#BE7F6B] hover:scale-105 duration-300   text-[#edede3] w-32 h-8 rounded-2xl  font-medium text-[14px]">
              REJECTED
            </button>
          </div>
        </div>
      </div> */}

            {/* .. */}
            <VideoCard
                visible={showMyModal}
                onClose={handleOnClose}
                data={clickedUserData}
            />
        </div>
    );
};

export default VerifyDummy;
