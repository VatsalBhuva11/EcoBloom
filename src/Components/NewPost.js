import React, { useState } from "react";
import tick from "../assets/images/tick.png";
import { Link } from "react-router-dom";
import { is } from "@babel/types";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage } from "../firebase.js";

const NewPost = ({ visible, onClose }) => {
    const [clicked, setClicked] = useState(false);
    const [status, setStatus] = useState(null);
    const [user, loading, error] = useAuthState(auth);
    const handleOnClose = (e) => {
        if (e.target.id === "container") {
            onClose();
            setClicked(false);
            setStatus(null);
        }
    };

    const handlePostCreation = (e) => {
        e.preventDefault();
        setClicked(true);
        if (auth.currentUser) {
            auth.currentUser.getIdToken().then((idToken) => {
                const formData = new FormData(
                    document.getElementById("postForm")
                );
                fetch(`${process.env.REACT_APP_DEPLOYED_API_URL}/org/post`, {
                    method: "POST",
                    body: formData,
                    headers: {
                        authorization: `Bearer ${idToken}`,
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("DATA: ", data);
                        setClicked(false);
                        if (data.status === "OK") {
                            setStatus(true);
                        } else {
                            setStatus(false);
                        }
                    })
                    .catch((err) => {
                        console.log("ERROR: ", err);
                        setStatus(true);
                        setClicked(false);
                    });
            });
        } else {
            setClicked(false);
            window.location.replace("/login");
        }
    };

    if (!visible) return null;

    return (
        <div
            id="container"
            onClick={handleOnClose}
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
        >
            <div className="bg-[#CDE1C9] p-2 rounded w-92 flex flex-col justify-center px-20">
                <div className="text-center font-bold text-lg mb-3">
                    ADD A NEW POST
                </div>
                <form id="postForm">
                    <input
                        className="block w-full text-sm  file:bg-[#0f1035] mt-4  file:text-white file:p-2 file:rounded-lg file:font-bold file:hover:scale-105 file:duration-300 rounded-lg cursor-pointer focus:outline-none bg-transparent text-[#0f1035]"
                        type="file"
                        name="photo"
                        accept="image/*"
                        required
                    />
                    <div className="mt-4">
                        <label
                            for="text"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                            Caption for post
                        </label>
                        <input
                            type="text"
                            name="caption"
                            id="caption"
                            className=" bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-700 placeholder-opacity-70"
                            required
                        />
                        <div className="flex justify-around mt-7 mb-5">
                            <button
                                onClick={() => {
                                    document
                                        .getElementById("container")
                                        .click();
                                }}
                                className="text-lg bg-[#EEF0E5] text-[#0F1035] w-32 h-8 rounded-lg border-2 border-[#0F1035]"
                            >
                                Cancel
                            </button>
                            {!clicked && status === null ? (
                                <button
                                    onClick={handlePostCreation}
                                    className="text-lg bg-[#0F1035] text-[#EEF0E5] w-32 h-8 rounded-lg"
                                >
                                    Create Post
                                </button>
                            ) : clicked && status === null ? (
                                <button
                                    className="text-lg bg-[#15174a] text-[#EEF0E5] w-32 h-8 rounded-lg"
                                    disabled
                                >
                                    Creating...
                                </button>
                            ) : !clicked && status === true ? (
                                <button
                                    className="text-lg bg-[#208445] text-[#ffffff] w-32 h-8 rounded-lg"
                                    disabled
                                >
                                    Success!
                                </button>
                            ) : (
                                <button className="text-lg bg-[#b72c45] text-[#EEF0E5] w-32 h-8 rounded-lg">
                                    Error!
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewPost;
