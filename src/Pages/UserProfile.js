import { React, useState, useContext } from "react";
import face from "../assets/images/face.jpg";
import logo from "../assets/images/logo.png";
import EditPassword from "./EditPassword";
import Change_profile from "./Change_profile";
import Update_Contact_Number from "./Update_Contact_Number";
import Verify_Email from "./Verify_Email";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { HashLoader } from "react-spinners";
import { ProfileContext } from "../Components/ProfileContextProvider.js";
import { GoogleAuthProvider, linkWithPopup } from "firebase/auth";

const UserProfile = () => {
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
            <div class="bg-[#eef0e5] relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto mt-32">
                <div class="flex justify-center">
                    <img
                        src={profile.url}
                        alt=""
                        class="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
                    />
                </div>

                <div class="mt-16">
                    <h1 class="font-bold text-center text-3xl text-gray-900">
                        {profile.name}
                    </h1>
                    {/* <p class="text-center text-sm text-gray-400 font-medium">
                        New York
                    </p> */}
                    <p>
                        <span></span>
                    </p>
                    {/* <div class="my-5 px-6">
                <a href="#" class="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white">Connect with <span class="font-bold">@pantazisoft</span></a>
            </div>
            <div class="flex justify-between items-center my-5 px-6">
                <a href="" class="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Facebook</a>
                <a href="" class="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Twitter</a>
                <a href="" class="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Instagram</a>
                <a href="" class="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Email</a>
            </div> */}
                    <div className="flex justify-evenly my-5 text-[12px] sm:text-[15px]">
                        <div className="flex flex-col justify-center items-center bg-[#DFE4C5] rounded-lg px-5">
                            <div>35🪙</div>
                            <div>Earned</div>
                        </div>
                        <div className="flex flex-col justify-center items-center bg-[#DFE4C5] rounded-lg px-5">
                            <div>53</div>
                            <div className="flex flex-col items-center justify-center gap-0">
                                <div>Campaigns</div>
                                <div>Attended</div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center bg-[#DFE4C5] rounded-lg px-5">
                            <div>21</div>
                            <div className="flex flex-col items-center justify-center gap-0">
                                <div>Communities</div>
                                <div>Joined</div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full">
                        {/* <h3 class="font-medium text-gray-900 text-left px-6">Recent activites</h3> */}
                        <div class="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                            <a
                                onClick={() => setShowMyModal(true)}
                                href="#"
                                class="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block hover:bg-gray-100 transition duration-150"
                            >
                                <img
                                    src={logo}
                                    alt=""
                                    class="rounded-full h-6 shadow-md inline-block mr-2"
                                />
                                Edit Password
                            </a>
                            <a
                                onClick={() => setShowMyModal1(true)}
                                href="#"
                                class="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block hover:bg-gray-100 transition duration-150"
                            >
                                <img
                                    src={logo}
                                    alt=""
                                    class="rounded-full h-6 shadow-md inline-block mr-2"
                                />
                                Change Profile Photo
                            </a>

                            <a
                                onClick={() => setShowMyModal2(true)}
                                href="#"
                                class="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block hover:bg-gray-100 transition duration-150"
                            >
                                <img
                                    src={logo}
                                    alt=""
                                    class="rounded-full h-6 shadow-md inline-block mr-2"
                                />
                                Update Contact Number
                            </a>

                            <a
                                onClick={() => setShowMyModal3(true)}
                                href="#"
                                class="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block hover:bg-gray-100 transition duration-150"
                            >
                                <img
                                    src={logo}
                                    alt=""
                                    class="rounded-full h-6 shadow-md inline-block mr-2"
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
            <button onClick={handleLinkWithGoogle}>Link With Google</button>
            {googleLinked === null ? (
                <div></div>
            ) : googleLinked === true ? (
                <div>Successfully logged in</div>
            ) : (
                <div>Failure while logging in</div>
            )}
            <EditPassword onClose={handleOnClose} visible={showMyModel} />
            <Change_profile onClose={handleOnClose1} visible={showMyModel1} />
            <Update_Contact_Number
                onClose={handleOnClose2}
                visible={showMyModel2}
            />
            <Verify_Email onClose={handleOnClose3} visible={showMyModel3} />
        </div>
    );
};

export default UserProfile;
