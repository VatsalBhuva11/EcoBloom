import React from 'react'
import Home from './Pages/Home';
import UserDashboard from './Pages/UserDashboard';
import SignupInitial from './Pages/SignupInitial';

export default function App() {
    return (
        <div>
            {/* <SignupInitial/> */}
            <Home/>
            {/* <UserDashboard/> */}
            <SignIn></SignIn>
        </div>
    );
}
