import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import SignIn from "../SignIn";
import { useAuthState } from "react-firebase-hooks/auth";
import { HashLoader } from "react-spinners";
import { auth } from "../firebase.js";
import { ProfileContextProvider } from "../Components/ProfileContextProvider.js";
import Loader from "../assets/images/Animation.gif";
import { ChatContextProvider } from "../Components/ChatContextProvider.js";

const HomePage = lazy(() => import("./HomePage.js"));
const UserSignup = lazy(() => import("./UserSignup"));
const Login = lazy(() => import("./Login"));
const SignupInitial = lazy(() => import("./SignupInitial"));
const UserDashboard = lazy(() => import("./UserDashboard"));
const OrgSignup = lazy(() => import("./OrgSignup"));
const Communities = lazy(() => import("./Communities"));
const Store = lazy(() => import("./Store"));
const UserProfile = lazy(() => import("./UserProfile"));
const CommunityChat = lazy(() => import("./CommunityChat"));
const Video = lazy(() => import("../Components/Video.js"));
const ForgetPassword = lazy(() => import("./ForgetPassword.js"));
const Orgdashboard = lazy(() => import("./Orgdashboard.js"));
const Orgprofile = lazy(() => import("./Orgprofile.js"));
const CreateCampaign = lazy(() => import("./CreateCampaign.js"));
const CampaignProfile = lazy(() => import("./CampaignProfile.js"));
const Badha_Campaigns = lazy(() => import("./Badha_Campaigns.js"));
const Activity_log = lazy(() => import("./Activity_log.js"));
const OrgCampaignProfile = lazy(() => import("./OrgCampaignProfile.js"));
const Delhivery = lazy(() => import("./Delhivery.js"));
const Edit_Profile_Org = lazy(() => import("./Edit_Profile_Org.js"));
const Admin = lazy(() => import("./Admin.js"));
const VerifyDummy = lazy(() => import("./VerifyDummy.js"));
const Quiz = lazy(() => import("./Quiz.js"));
const FreshUserSignUp = lazy(() => import("./FreshUserSignUp.js"));
const New_User_Dashboard = lazy(() =>
    import("../Components/New_User_Dashboard.js")
);

export default function Home() {
    const [user, loading, error] = useAuthState(auth);
    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <img src={Loader} height={200} width={200}></img>
            </div>
        );
    }
    return (
        <div>
            <ProfileContextProvider>
                <ChatContextProvider>
                    <BrowserRouter>
                        <Suspense
                            fallback={
                                <div className="h-screen flex items-center justify-center">
                                    <img
                                        src={Loader}
                                        height={200}
                                        width={200}
                                    ></img>
                                </div>
                            }
                        >
                            {" "}
                            {/* You can replace this with any loading indicator you like */}
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
                                <Route
                                    exact
                                    path="/signup/user"
                                    element={
                                        <>
                                            <FreshUserSignUp />
                                        </>
                                    }
                                />
                                <Route
                                    exact
                                    path="/login"
                                    element={<Login />}
                                />
                                <Route
                                    exact
                                    path="/signup"
                                    element={<SignupInitial />}
                                />
                                {/* <Route
                            exact
                            path="/signup/user"
                            element={<UserSignup />}
                        /> */}

                                {/* <Route
                            exact
                            path="/signup/user"
                            element={<UserAuth />}
                        /> */}
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
                                    path="/org/edit/profile"
                                    element={<Edit_Profile_Org />}
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
                                    path="/org/profile/:orgId"
                                    element={<Orgprofile />}
                                />
                                <Route
                                    exact
                                    path="/video"
                                    element={<Video />}
                                />

                                <Route
                                    exact
                                    path="/store"
                                    element={<Store />}
                                />
                                <Route exact path="/quiz" element={<Quiz />} />
                                <Route
                                    exact
                                    path="/chat"
                                    element={<CommunityChat />}
                                />
                                <Route
                                    exact
                                    path="/login/forgetpassword"
                                    element={<ForgetPassword />}
                                />
                                <Route
                                    exact
                                    path="/campaign/create"
                                    element={<CreateCampaign />}
                                />
                                <Route
                                    exact
                                    path="/campaign/:campaignId"
                                    element={<CampaignProfile />}
                                />
                                <Route
                                    exact
                                    path="/org/campaign/:campaignId"
                                    element={<OrgCampaignProfile />}
                                />
                                <Route
                                    exact
                                    path="/log"
                                    element={<Activity_log />}
                                />
                                <Route
                                    exact
                                    path="/campaigns"
                                    element={<Badha_Campaigns />}
                                />
                                <Route
                                    exact
                                    path="/campaign/:campaignId/verify"
                                    element={<VerifyDummy />}
                                />

                                <Route
                                    exact
                                    path="/admin"
                                    element={<Admin />}
                                />

                                <Route
                                    exact
                                    path="/store/order"
                                    element={<Delhivery />}
                                />
                                <Route
                                    exact
                                    path="/newuser"
                                    element={<New_User_Dashboard />}
                                />
                            </Routes>
                        </Suspense>
                    </BrowserRouter>
                </ChatContextProvider>
            </ProfileContextProvider>
        </div>
    );
}
