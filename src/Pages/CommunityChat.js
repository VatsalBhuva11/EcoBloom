import React, { useState, useEffect, useContext } from "react";
import ChatLeftBar from "../Components/ChatLeftBar";
import ChatRightBar from "../Components/ChatRightBar";
import Chatbar from "../Components/Chatbar";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { HashLoader } from "react-spinners";
import Loader from "../assets/images/Animation.gif";

import {
    ChatContext,
    ChatContextProvider,
} from "../Components/ChatContextProvider";

export default function CommunityChat() {
    const [user, loading, error] = useAuthState(auth);
    //const [loader, setLoader] = useState(false);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <img src={Loader} height={150} width={150}></img>
            </div>
        );
    }
    return (
        <ChatContextProvider>
            <div className="flex justify-between">
                <div className="hidden lg:flex lg:w-[20%]">
                    <ChatLeftBar />
                </div>
                <div className="lg:w-[60%] w-[100%]">
                    <Chatbar />
                </div>
                <div className="hidden lg:flex lg:w-[20%]">
                    <ChatRightBar />
                </div>
            </div>
        </ChatContextProvider>
    );
}
