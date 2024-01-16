import React from "react";
// import OrganizationAuth from "./OrganizationAuth";
import Home from "./Pages/Home";
import UserDashboard from './Pages/UserDashboard';
import CreateCampaign from "./Pages/CreateCampaign";
// import SignupInitial from './Pages/SignupInitial';

export default function App() {
    return (
        <div>
            {/* <SignupInitial/> */}
            {/* <Home /> */}
            <UserDashboard/>
            <CreateCampaign/>
            {/* <SignIn></SignIn> */}
            {/* <OrganizationAuth></OrganizationAuth> */}
        </div>
    );
}
