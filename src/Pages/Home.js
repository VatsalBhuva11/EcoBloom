import React from 'react'
import About from "../Components/About";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import Signup from "./Signup";
import PastCampaigns from "../Components/PastCampaigns";
import Login from './Login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "../SignIn";


export default function Home() {
  return (
    <div>
         <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={
                        <><Navbar />
                            {/* <Hero /> */}
                            <About />
                            <PastCampaigns /></>} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                </Routes>
            </BrowserRouter>
    </div>
  )
}
