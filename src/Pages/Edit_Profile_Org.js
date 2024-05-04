import { React, useState, useContext, useEffect } from "react";
import logo from "../assets/images/logo.png";
import EditPasswordOrg from "./EditPassword";
import Change_profile_org from "./Change_profile_org";
import Verify_Email from "./Verify_Email";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { HashLoader } from "react-spinners";
import { ProfileContext } from "../Components/ProfileContextProvider.js";
import { GoogleAuthProvider, linkWithPopup } from "firebase/auth";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Change_banner from "./Change_banner.js";
import { jwtDecode } from "jwt-decode";
import Loader from "../assets/images/Animation.gif";

const Edit_Profile_Org = () => {
    const [showMyModel, setShowMyModal] = useState(false);
    const handleOnClose = () => setShowMyModal(false);

    const [showMyModel1, setShowMyModal1] = useState(false);
    const handleOnClose1 = () => setShowMyModal1(false);

    const [showMyModel2, setShowMyModal2] = useState(false);
    const handleOnClose2 = () => setShowMyModal2(false);

    const [showMyModel3, setShowMyModal3] = useState(false);
    const handleOnClose3 = () => setShowMyModal3(false);
    const [user, loading, error] = useAuthState(auth);
    const [profile, setProfile] = useContext(ProfileContext);
    const [googleLinked, setGoogleLinked] = useState(null);
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();

    //have a look at this loader function
    useEffect(() => {
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
        }
    }, [loading]);

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
        <div className='absolute w-screen bg-[url("./assets/images/profile_bg.jpg")] bg-cover h-screen'>
            <div className="bg-[#fbfbfa] relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto mt-32">
                <button
                    onClick={() => {
                        navigate(-1);
                    }}
                    className="text-2xl p-4 hover:scale-110 duration-300"
                >
                    <IoArrowBackSharp />
                </button>
                <div className="flex justify-center">
                    <img
                        src={profile.logo}
                        alt=""
                        className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
                    />
                </div>

                <div className="mt-3">
                    <h1 className="font-bold text-center text-3xl text-gray-900">
                        {profile.name}
                    </h1>
                    {/* <p className="text-center text-sm text-gray-400 font-medium">
                        New York
                    </p> */}
                    <p>
                        <span></span>
                    </p>

                    <div className="w-full">
                        {/* <h3 className="font-medium text-gray-900 text-left px-6">Recent activites</h3> */}
                        <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                            <a
                                onClick={() => setShowMyModal(true)}
                                href="#"
                                className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block hover:bg-gray-100 transition duration-150"
                            >
                                <img
                                    src={logo}
                                    alt=""
                                    className="rounded-full h-6 shadow-md inline-block mr-2"
                                />
                                Edit Password
                            </a>
                            <a
                                onClick={() => setShowMyModal1(true)}
                                href="#"
                                className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block hover:bg-gray-100 transition duration-150"
                            >
                                <img
                                    src={logo}
                                    alt=""
                                    className="rounded-full h-6 shadow-md inline-block mr-2"
                                />
                                Change Profile Photo
                            </a>

                            <a
                                onClick={() => setShowMyModal2(true)}
                                href="#"
                                className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block hover:bg-gray-100 transition duration-150"
                            >
                                <img
                                    src={logo}
                                    alt=""
                                    className="rounded-full h-6 shadow-md inline-block mr-2"
                                />
                                Change Profile banner
                            </a>

                            <a
                                onClick={() => setShowMyModal3(true)}
                                href="#"
                                className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block hover:bg-gray-100 transition duration-150"
                            >
                                <img
                                    src={logo}
                                    alt=""
                                    className="rounded-full h-6 shadow-md inline-block mr-2"
                                />
                                Verify email
                            </a>

                            <a
                                href=""
                                className=" text-green-800 font-bold text-xl py-3"
                                onClick={() => {
                                    signOut(auth);
                                    localStorage.removeItem("profile");
                                    window.location.href = "/";
                                }}
                            >
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <EditPasswordOrg onClose={handleOnClose} visible={showMyModel} />
            <Change_profile_org
                onClose={handleOnClose1}
                visible={showMyModel1}
            />
            <Change_banner onClose={handleOnClose2} visible={showMyModel2} />
            <Verify_Email onClose={handleOnClose3} visible={showMyModel3} />
        </div>
    );
};

export default Edit_Profile_Org;
