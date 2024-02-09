import { React, useState, useContext } from "react";
import logo from "../assets/images/logo.png";
import EditPassword from "./EditPassword";
import Change_profile from "./Change_profile";
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
    const navigate = useNavigate();

    function handleLinkWithGoogle() {
        const provider = new GoogleAuthProvider();

        // link only for same gmail account

        linkWithPopup(auth.currentUser, provider)
            .then((result) => {
                // Accounts successfully linked.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                setGoogleLinked(true);
                const user = result.user;
                console.log("Successfully linked with Google account!");
                // ...
            })
            .catch((error) => {
                setGoogleLinked(false);
                console.log("Error linking with Google account!");
                // Handle Errors here.
                // ...
            });
    }

    if (loading) {
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
        <div className='absolute w-screen bg-[url("./assets/images/profile_bg.jpg")] bg-cover h-screen'>
            <div className="bg-[#eef0e5] relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto mt-32">
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
                            <a className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block hover:bg-gray-100 transition duration-150">
                                <button onClick={handleLinkWithGoogle}>
                                    <div className="flex items-center">
                                        <div className="flex items-center justify-center bg-white w-9 h-9 r rounded-full mr-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                className="w-5 h-5"
                                            >
                                                <title>
                                                    Sign in with Google
                                                </title>
                                                <desc>Google G Logo</desc>
                                                <path
                                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                    className="fill-google-logo-blue"
                                                ></path>
                                                <path
                                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                    className="fill-google-logo-green"
                                                ></path>
                                                <path
                                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                    className="fill-google-logo-yellow"
                                                ></path>
                                                <path
                                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                    className="fill-google-logo-red"
                                                ></path>
                                            </svg>
                                        </div>
                                        <div className="title">
                                            Link with Google
                                        </div>
                                    </div>
                                </button>
                                {googleLinked === null ? (
                                    <div></div>
                                ) : googleLinked === true ? (
                                    <div className="text-green-500 ml-5">
                                        Successfully logged in
                                    </div>
                                ) : (
                                    <div className=" text-red-500 ml-5">
                                        Failure while logging in
                                    </div>
                                )}
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

            <EditPassword onClose={handleOnClose} visible={showMyModel} />
            <Change_profile onClose={handleOnClose1} visible={showMyModel1} />
            <Change_banner onClose={handleOnClose2} visible={showMyModel2} />
            <Verify_Email onClose={handleOnClose3} visible={showMyModel3} />
        </div>
    );
};

export default Edit_Profile_Org;
