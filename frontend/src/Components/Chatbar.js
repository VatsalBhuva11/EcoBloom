import React, { useState, useContext, useRef, useEffect } from "react";
import person from "../assets/images/unknown.jpg";
import ChatBubbleArrival from "./ChatBubbleArrival";
import ChatBubbleDept from "./ChatBubbleDept";
import { CiCirclePlus } from "react-icons/ci";
import { IoMdSend } from "react-icons/io";
import {
    FaPlus,
    FaLongArrowAltRight,
    FaLongArrowAltLeft,
} from "react-icons/fa";
import { IoMdPhotos } from "react-icons/io";
import { IoIosDocument } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import { MdKeyboardVoice, MdSend } from "react-icons/md";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import deleteicon from "../assets/images/delete.png";

import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
    query,
    addDoc,
    serverTimestamp,
    collection,
    orderBy,
    onSnapshot,
    limit,
} from "firebase/firestore";
import { jwtDecode } from "jwt-decode";
import { ChatContext } from "./ChatContextProvider";
import { ProfileContext } from "./ProfileContextProvider";

export default function Chatbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [nav, setNav] = useState(false);
    const [message, setMessage] = useState("");
    const { currComm, setCurrComm, communities } = useContext(ChatContext);
    const [profile, setProfile] = useContext(ProfileContext);
    const [user, loading, error] = useAuthState(auth);
    const [messages, setMessages] = useState([]);
    const [sender, setSender] = useState({});
    const { uid, displayName } = auth.currentUser;

    useEffect(() => {
        if (auth.currentUser) {
            auth.currentUser.getIdToken().then((idToken) => {
                const idTokenResult = jwtDecode(idToken);
                console.log("IDTOKEN: ", idTokenResult);
                setSender({
                    name: idTokenResult.name,
                    userId: idTokenResult.userId,
                });
            });
        }
    }, [loading]);

    useEffect(() => {
        const q = query(
            collection(db, "messages"),
            orderBy("createdAt", "asc"), // Ensure messages are ordered by timestamp in descending order
            limit(50)
        );
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            const fetchedMessages = [];
            QuerySnapshot.forEach((doc) => {
                fetchedMessages.push({ ...doc.data(), id: doc.id });
            });
            console.log(fetchedMessages);
            // const sortedMessages = fetchedMessages.sort(
            //     (a, b) => a.createdAt - b.createdAt // Sort messages in descending order by timestamp
            // );
            setMessages(fetchedMessages);
        });
        return () => unsubscribe;
    }, []);

    const sendMessage = async (event) => {
        event.preventDefault();
        if (message.trim() === "") {
            alert("Enter valid message");
            return;
        }

        setMessage("");

        await addDoc(collection(db, "messages"), {
            text: message,
            name: displayName,
            avatar: profile.url,
            createdAt: serverTimestamp(),
            uid,
            community: currComm._id,
        });
    };

    const handleNav = () => {
        setNav(!nav);
    };

    return (
        <div className="bg-[#fbfbfa] h-screen w-full ">
            <div className=" infobar flex  flex-col">
                <div className="flex items-center bg-gradient-to-b from-[#1b5449] to-[#277868] p-6 2xl:pb-3 border-b-2 xl:gap-3 2xl:gap-7 px-4 2xl:px-7 justify-between ">
                    <div className="element items-center flex gap-2">
                        <img
                            className="w-[73px] h-[71px] 2xl:w-[60px] 2xl:h-[60px] rounded-full"
                            src={currComm.logo}
                            alt=""
                        />
                        <div className="flex flex-col">
                            <p className="text-[#fbfbfa] text-[1.5rem] 2xl:text-xl mt-1 2xl:mt-0">
                                {currComm?.orgName}
                            </p>
                            <p className="text-[#fbfbfa] text-[0.75rem] 2xl:text-[1rem]">
                                {currComm?.userCount} members
                            </p>
                        </div>
                    </div>

                    <div
                        onClick={handleNav}
                        className="text-2xl text-white cursor-pointer  lg:3xl block lg:hidden ml-2 "
                    >
                        {nav ? <AiOutlineClose /> : <AiOutlineMenu />}
                    </div>
                </div>
                {nav ? (
                    <div className=" lg:hidden flex justify-end mr-6">
                        <div className=" absolute mt-1 flex flex-col bg-gradient-to-b from-[#0f1035] to-[#4b4e97] justify-center rounded-lg">
                            <div className="px-10 py-5 flex justify-center ">
                                {" "}
                                <button className=" flex justify-center items-center gap-1 bg-[#fbfbfa] text-[#0f1035] font-bold rounded-xl h-[2.5rem] w-32 hover:scale-105 duration-300 ">
                                    View Profile
                                    <div className="mt-[0.32rem] text-xl">
                                        <FaLongArrowAltRight />
                                    </div>
                                </button>
                            </div>

                            <div className="flex gap-1 p-2">
                                <div className="text-white text-lg font-bold">
                                    Go to
                                </div>
                                <div className="mt-[0.32rem] text-xl text-white">
                                    <FaLongArrowAltRight />
                                </div>{" "}
                            </div>
                            <div className="flex flex-col justify-center p-2 h-[185px] overflow-scroll overflow-x-hidden">
                                {communities?.map((community) => (
                                    <div
                                        onClick={() => {
                                            setCurrComm(community);
                                        }}
                                        className="flex items-center border-b-2 border-b-gray-white p-1 gap-1 "
                                    >
                                        <img
                                            src={person}
                                            alt=".."
                                            className="rounded-full h-[30px] w-[30px] my-2"
                                        />
                                        <div className="text-white font-semibold my-2">
                                            {community?.orgName}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="px-10 py-2 flex justify-center mt-1">
                                {" "}
                                <button
                                    onClick={() => {
                                        window.location.href = "/";
                                    }}
                                    className=" flex justify-center items-center gap-1 bg-[#fbfbfa] text-[#0f1035] font-bold rounded-xl h-[2.5rem] w-32 hover:scale-105 duration-300 "
                                >
                                    <div className=" text-lg">
                                        <FaLongArrowAltLeft />
                                    </div>
                                    <div className="text-sm">Back to Home</div>
                                </button>
                            </div>
                            <div className="px-10 py-2 flex">
                                <img
                                    className="w-[25px] h-[25px] cursor-pointer rounded-full"
                                    src={deleteicon}
                                    alt=""
                                />
                                <div className=" font-inter cursor-pointer text-red-500 font-bold text-[20px] hover:underline">
                                    Leave Community
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
            <div className="chatbox px-4 h-[75%]  border-black overflow-scroll scrollbar-hide bg-[#fbfbfa]">
                {messages.map((message) =>
                    message.community === currComm?._id ? (
                        message.uid === uid ? (
                            <ChatBubbleDept message={message} />
                        ) : (
                            <ChatBubbleArrival message={message} />
                        )
                    ) : null
                )}
            </div>
            <div className="inputarea">
                <div className="flex items-center ml-5 gap-2">
                    <button
                        onClick={() => setIsOpen((isOpen) => !isOpen)}
                        className="text-4xl  mt-[11px] cursor-pointer rounded-full"
                    >
                        <CiCirclePlus />
                        {isOpen && (
                            <div className="bg-[#DFE4C5] shadow-lg rounded-2xl p-3 absolute bottom-16">
                                <div className="flex flex-col text-sm">
                                    <div className="flex items-center rounded-lg hover:bg-[#9fa67e]">
                                        <div className="text-xl mr-1">
                                            <IoIosDocument />
                                        </div>
                                        <div className="text-lg"> Document</div>
                                    </div>
                                    <div className="flex items-center rounded-lg hover:bg-[#9fa67e]">
                                        <div className="text-xl mr-1">
                                            <IoMdPhotos />
                                        </div>
                                        <div className="text-lg">
                                            Photos & Videos
                                        </div>
                                    </div>
                                    <div className="flex items-center rounded-lg hover:bg-[#9fa67e]">
                                        <div className="text-xl mr-1">
                                            <FaCamera />
                                        </div>
                                        <div className="text-lg">Camera</div>
                                    </div>
                                    <div className="flex items-center rounded-lg hover:bg-[#9fa67e]">
                                        <div className="text-xl mr-1">
                                            <MdKeyboardVoice />
                                        </div>
                                        <div className="text-lg">Voice</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </button>
                    <form
                        onSubmit={(event) => sendMessage(event)}
                        className="send-message flex justify-center items-center w-full"
                    >
                        <input
                            type="text"
                            id="sendMessage"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write your message"
                            className="bg-[#D2D5D4] border border-gray-300 text-gray-900 text-sm rounded-lg placeholder:text-gray-600 focus:border-blue-500 block w-[85%]  mt-2 p-2.5"
                        />
                        <div className="send ml-[10px] basis-4">
                            <button
                                type="submit"
                                className="rounded-full hover:scale-105 duration-300  self-center p-2 mt-[9px] bg-[#20A090]"
                            >
                                <div className="text-2xl text-white ml-[3px]">
                                    <IoMdSend />
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
