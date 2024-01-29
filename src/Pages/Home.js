import React from "react";
import UserSignup from "./UserSignup";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import SignIn from "../SignIn";
import SignupInitial from "./SignupInitial";
import UserDashboard from "./UserDashboard";
import OrgSignup from "./OrgSignup";
import Communities from "./Communities";
import Store from "./Store";
import UserProfile from "./UserProfile";
import CommunityChat from "./CommunityChat";
import HomePage from "./HomePage.js";
import Video from "./Video.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { HashLoader } from "react-spinners";
import { auth } from "../firebase.js";
import ForgetPassword from "./ForgetPassword.js";
import { ProfileContextProvider } from "../Components/ProfileContextProvider.js";
import Orgdashboard from "./Orgdashboard.js";
import Orgprofile from "./Orgprofile.js";
import CreateCampaign from "./CreateCampaign.js";
import logo from "../assets/images/logo.png";
import CampaignProfile from "./CampaignProfile.js";
import Activity_log from "./Activity_log.js";

export default function Home() {
    const [user, loading, error] = useAuthState(auth);
    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <HashLoader color="#36d7b7" size={100} />
            </div>
        );
    }
    return (
        <div>
            <ProfileContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={
                                <>
                                    <HomePage />
                                </>
                            }
                        />
                        <Route exact path="/login" element={<Login />} />
                        <Route
                            exact
                            path="/signup"
                            element={<SignupInitial />}
                        />
                        <Route
                            exact
                            path="/signup/user"
                            element={<UserSignup />}
                        />
                        <Route
                            exact
                            path="/user/dashboard"
                            element={<UserDashboard />}
                        />
                        <Route
                            exact
                            path="/user/join"
                            element={<Communities />}
                        />
                        <Route
                            exact
                            path="/user/profile"
                            element={<UserProfile />}
                        />
                        <Route
                            exact
                            path="/signup/org"
                            element={<OrgSignup />}
                        />

                        <Route
                            exact
                            path="/org/dashboard"
                            element={<Orgdashboard />}
                        />
                        <Route
                            exact
                            path="/org/profile"
                            element={<Orgprofile />}
                        />
                        <Route exact path="/video" element={<Video />} />

                        <Route exact path="/store" element={<Store />} />
                        <Route exact path="/chat" element={<CommunityChat />} />
                        <Route
                            exact
                            path="/login/forgetpassword"
                            element={<ForgetPassword />}
                        />
                        <Route
                            exact
                            path="/createcampaign"
                            element={<CreateCampaign />}
                        />
                        <Route
                            exact
                            path="/campaign/profile"
                            element={<CampaignProfile />}
                        />
                        <Route
                            exact
                            path="/log"
                            element={<Activity_log/>}
                        />
                    </Routes>
                </BrowserRouter>
            </ProfileContextProvider>
        </div>
    );
}
