import React from "react";
import About from "../Components/About";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import Parallax from "../Components/Parallax";
import UserSignup from "./UserSignup";
import PastCampaigns from "../Components/PastCampaigns";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import SignIn from "../SignIn";
import SignupInitial from "./SignupInitial";
import JoinUs from "../Components/JoinUs";
import CreateCampaigns from "../Components/CreateCampaigns";
import Footer from "../Components/Footer";
import UserDashboard from "./UserDashboard";
import OrgSignup from "./OrgSignup";
import Store from "./Store";
import CommunityChat from "./CommunityChat";
import { useAuthState } from "react-firebase-hooks/auth";
import { HashLoader } from "react-spinners";
import { auth } from "../firebase.js";
import Forget_Password from "./Forget_Password.js";

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
            <BrowserRouter>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            <>
                                <Navbar />
                                {/* <Hero /> */}
                                <Parallax />
                                <About />
                                <PastCampaigns />
                                <JoinUs />
                                <CreateCampaigns />
                                <Footer />
                            </>
                        }
                    />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/signup" element={<SignupInitial />} />
                    <Route exact path="/signup/user" element={<UserSignup />} />
                    <Route exact path="/user/dashboard" element={<UserDashboard />} />
                    <Route exact path="/signup/org" element={<OrgSignup />} />
                    <Route exact path="/store" element={<Store />} />
                    <Route exact path="/chat" element={<CommunityChat />} />
                    <Route exact path='/login/forgetpassword' element={<Forget_Password/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
