
import About from "./Components/About";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import Signup from "./Pages/Signup";
import PastCampaigns from "./Components/PastCampaigns";
import Login from "./Pages/Login";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
  } from "react-router-dom";

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <Hero/>           
                <About />
                <PastCampaigns/>
                <Routes>
                    <Route path='/login' element={<Login/>} />
                    <Route path='/signup' element={<Signup/>} />
                </Routes>
                {/* <Login/>
                <Signup/> */}
            </BrowserRouter>
        </div>
    );
}
