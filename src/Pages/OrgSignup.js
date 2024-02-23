import React from "react";
import login from "../assets/images/login.png";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import logo from "../assets/images/logo.png";

import Terms_Conditions from "./Terms_Conditions.js";

export default function UserSignup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [signUpClicked, setSignUpClicked] = useState(false);
    const [status, setStatus] = useState("none");
    const [showMyModel1, setShowMyModal1] = useState(false);
    const handleOnClose1 = () => setShowMyModal1(false);

    function emailSignUp(event) {
        setSignUpClicked(true);
        event.preventDefault();
        setStatus("none");
        if (password !== confirmPassword) {
            console.log("Passwords do not match!");
            setSignUpClicked(false);
            return;
        }

        // let files = document.querySelector('input[type="file"]').files;
        let formData = new FormData(document.getElementById("emailSignUp"));

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed Up
                console.log("User in Firebase: ", userCredential.user);
                const user = userCredential.user;
                const userData = {
                    role: "org",
                    firebaseId: user.uid,
                }; // Include any other relevant user data
                console.log("userData: ", userData);
                // Call Cloud Function to handle custom claims and other operations
                const functions = getFunctions();
                const setCustomClaims = httpsCallable(
                    functions,
                    "setCustomClaims"
                );

                formData.append("firebaseId", user.uid);
                fetch(
                    `${process.env.REACT_APP_DEPLOYED_API_URL}/auth/org/register`,
                    {
                        method: "POST",
                        body: formData,
                    }
                )
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        if (data.status === "error") {
                            setStatus("failure");
                            setSignUpClicked(false);
                            auth.currentUser.delete();

                            throw new Error(
                                "Invalid form input. Please check again."
                            );
                        } else {
                            setCustomClaims(userData)
                                .then((result) => {
                                    console.log(
                                        "result from setCustomClaims from client: ",
                                        result
                                    );
                                    console.log(user);
                                    setStatus("success");
                                    setSignUpClicked(false);
                                })
                                .catch((err) => {
                                    console.log(err);
                                    setStatus("failure");
                                    setSignUpClicked(false);
                                });
                            console.log("Success:", data);
                        }
                    })
                    .catch((error) => {
                        setStatus("failure");
                        setSignUpClicked(false);
                        console.error("Error:", error);
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("Coming here");
                setStatus("failure");
                setSignUpClicked(false);
                console.log(error);
            });
    }

    return (
        <div className="h-screen">
            <div className=" bg-[#EEF0E5] ">
                <div className="md:flex hidden">
                    <Link to="/">
                        <img
                            className="h-12  hover:scale-105 duration-300 md:h-16 "
                            src={logo}
                            alt=""
                        />
                    </Link>
                </div>
                <div className=" flex justify-center">
                    <div class="flex flex-col items-center lg:w-3/4 md:w-5/6 tablet:w-7/8 w-screen justify-center h-screen lg:py-0 ">
                        <div class="lg:w-3/4 md:w-5/6  rounded-lg shadow md:px-0 px-4 md:mt-0 mt-8  bg-gradient-to-b from-[#9db39b] to-transparent">
                            <div class="p-1 space-y-1 md:space-y-2 sm:p-3 px-4 py-2">
                                <div className="content">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                        Create Account
                                    </h1>
                                    <p className=" text-xs">
                                        Just some details to get you in!
                                    </p>
                                </div>
                                <form
                                    className="space-y-2 md:space-y-4"
                                    action="#"
                                    id="emailSignUp"
                                >
                                    <div className="md:flex md:justify-evenly md:items-center">
                                        <div className="part1 w-[40%]">
                                            <div>
                                                <label
                                                    for="text"
                                                    class="block my-2 text-md font-medium text-gray-900 "
                                                >
                                                    Name<sup> *</sup>
                                                </label>
                                                <input
                                                    type="name"
                                                    name="name"
                                                    id="name"
                                                    className=" bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-700 placeholder-opacity-70"
                                                    placeholder="John Doe"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    for="email"
                                                    class="block my-2 text-md font-medium text-gray-900 "
                                                >
                                                    Email<sup> *</sup>
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    className=" bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-700 placeholder-opacity-70"
                                                    placeholder="johndoe@example.com"
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    for="password"
                                                    class="block my-2 text-md font-medium text-gray-900"
                                                >
                                                    Password<sup> *</sup>
                                                </label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    placeholder="••••••••"
                                                    className=" bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focyus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-700 placeholder-opacity-70"
                                                    onChange={(e) =>
                                                        setPassword(
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    for="password"
                                                    class="block my-2 text-md font-medium text-gray-900"
                                                >
                                                    Confirm Password
                                                    <sup> *</sup>
                                                </label>
                                                <input
                                                    type="password"
                                                    name="confirmPassword"
                                                    id="confirmPassword"
                                                    placeholder="••••••••"
                                                    className=" bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-700 placeholder-opacity-70"
                                                    required=""
                                                    onChange={(e) =>
                                                        setConfirmPassword(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="part2">
                                            <div>
                                                <label
                                                    for="description"
                                                    class="block my-2 text-md font-medium text-gray-900 "
                                                >
                                                    Community Description
                                                    <sup> *</sup>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="description"
                                                    id="description"
                                                    class=" bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-700 placeholder-opacity-70"
                                                    placeholder="describe your organisation"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    class="block my-2 text-md font-medium text-[#0f1035]"
                                                    for="document"
                                                >
                                                    Upload Document<sup>*</sup>
                                                </label>
                                                <input
                                                    className="block w-full text-sm  file:bg-[#0f1035]  file:text-white file:p-2 file:rounded-lg file:font-bold file:hover:scale-105 file:duration-300 rounded-lg cursor-pointer focus:outline-none bg-transparent text-[#0f1035]"
                                                    aria-describedby="file_input_help"
                                                    id="document"
                                                    name="document"
                                                    type="file"
                                                    accept="application/pdf"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    class="block my-2 text-md font-medium text-[#0f1035]"
                                                    for="logo"
                                                >
                                                    Upload Logo<sup>*</sup>
                                                </label>
                                                <input
                                                    className="block w-full text-sm  file:bg-[#0f1035]  file:text-white file:p-2 file:rounded-lg file:font-bold file:hover:scale-105 file:duration-300 rounded-lg cursor-pointer focus:outline-none bg-transparent text-[#0f1035]"
                                                    aria-describedby="file_input_help"
                                                    id="logo"
                                                    name="logo"
                                                    type="file"
                                                    accept="image/*"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    class="block my-2 text-md font-medium text-[#0f1035]"
                                                    for="banner"
                                                >
                                                    Upload Banner<sup>*</sup>
                                                </label>
                                                <input
                                                    class="block w-full text-sm  file:bg-[#0f1035]  file:text-white file:p-2 file:rounded-lg file:font-bold file:hover:scale-105 file:duration-300 rounded-lg cursor-pointer focus:outline-none bg-transparent text-[#0f1035]"
                                                    aria-describedby-="file_input_help"
                                                    id="banner"
                                                    name="banner"
                                                    type="file"
                                                    accept="image/*"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {!signUpClicked ? (
                                        <div className="flex justify-center">
                                            <button
                                                type="submit"
                                                class="w-3/4 bg-[#0F1035] items-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:scale-105 duration-300"
                                                onClick={emailSignUp}
                                            >
                                                Create Account
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex justify-center">
                                            <button
                                                type="submit"
                                                class="w-3/4 bg-[#5a5d5f] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:scale-105 duration-300"
                                                disabled
                                            >
                                                Creating Account...
                                            </button>
                                        </div>
                                    )}
                                    {status === "success" ? (
                                        <p className="text-md text-green-500 font-bold">
                                            Successfully registered
                                            organization!{" "}
                                            <a
                                                href="/login"
                                                className="underline"
                                            >
                                                Please login to continue.
                                            </a>
                                        </p>
                                    ) : status === "failure" ? (
                                        <p className="text-md text-red-500">
                                            Error occurred while registering
                                            user. Please try again.
                                        </p>
                                    ) : null}
                                    <p className="text-sm  text-black">
                                        Already have an account?{" "}
                                        <Link
                                            to="/login"
                                            className="font-bold text-primary-600 hover:underline "
                                        >
                                            Log In
                                        </Link>
                                    </p>
                                </form>
                            </div>
                            <div className="flex justify-around my-2">
                                <div className=" cursor-pointer hover:underline">
                                    <button
                                        onClick={() => setShowMyModal1(true)}
                                        className=" hover:underline"
                                    >
                                        Terms&Conditions
                                    </button>
                                </div>
                                <a href="https://firebasestorage.googleapis.com/v0/b/ecobloom-gdsc-challenge.appspot.com/o/docs%2FSupport.pdf?alt=media&token=9521bd7c-3e74-4c94-b33e-dff6d340ddae">
                                <div className=" cursor-pointer hover:underline ">
                                    Support
                                </div>
                                </a>
                                <a href="https://firebasestorage.googleapis.com/v0/b/ecobloom-gdsc-challenge.appspot.com/o/docs%2FCustomer%20care.pdf?alt=media&token=415654fe-1d86-4da7-81bf-96715be05cd3">
                                <div className=" cursor-pointer hover:underline">
                                    Customer Care
                                </div>
                                </a>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Terms_Conditions onClose={handleOnClose1} visible={showMyModel1} />
        </div>
    );
}
