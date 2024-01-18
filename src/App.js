import React from "react";
// import OrganizationAuth from "./OrganizationAuth";
import Home from "./Pages/Home";
import UserDashboard from "./Pages/UserDashboard";
import CommunityChat from "./Pages/CommunityChat";
import Store from './Pages/Store'
// import SignupInitial from './Pages/SignupInitial';

export default function App() {
    return (
        <div>
            {/* <SignupInitial/> */}
            <Home />
            {/* <Store/> */}
            {/* <CommunityChat/> */}
            {/* <UserDashboard/> */}
            {/* <SignIn></SignIn> */}
            {/* <OrganizationAuth></OrganizationAuth> */}
        </div>
    );
}
