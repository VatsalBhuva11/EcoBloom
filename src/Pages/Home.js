import React from "react";
import About from "../Components/About";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import Signup from "./Signup";
import PastCampaigns from "../Components/PastCampaigns";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import SignIn from "../SignIn";
import SignupInitial from "./SignupInitial";
import JoinUs from "../Components/JoinUs";
import CreateCampaigns from "../Components/CreateCampaigns";
import Footer from "../Components/Footer";

export default function Home() {
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
                                <About />
                                <PastCampaigns />
                                <JoinUs />
                                <CreateCampaigns />
                                <Footer />
                            </>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignupInitial />} />
                    <Route path="/signup/user" element={<Signup />} />
                    {/* <Route path='/signuporg' element={<Signup/>}/> */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}
