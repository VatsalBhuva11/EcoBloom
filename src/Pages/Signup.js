import React from "react";
import login from "../assets/images/login.png";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../index.js";
import { useState } from "react";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function emailSignUp(event) {
        event.preventDefault();
        if (password !== confirmPassword) {
            console.log("Passwords do not match!");
            return;
        }

        // let files = document.querySelector('input[type="file"]').files;
        let formData = new FormData(document.getElementById("emailSignUp"));

        fetch(`${process.env.REACT_APP_LOCAL_API_URL}/auth/user/register`, {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "error") {
                    throw new Error("Invalid form input. Please check again,");
                } else {
                    console.log("User in DB: ");
                    console.log(data);
                    createUserWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                            // Signed Up
                            console.log("User in Firebase");
                            const user = userCredential.user;
                            console.log(user);
                            // ...
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            // ..
                            console.log(error);
                        });
                    console.log("Success:", data);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    return (
        <div className="h-screen">
            <div className=" bg-[#EEF0E5]">
                <div className=" flex justify-between items-center">
                    <div class="flex flex-col items-center px-6 py-8 w-[50rem] justify-center md:h-screen lg:py-0 ">
                        <div class="w-full rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 bg-gradient-to-b from-[#9db39b] to-transparent">
                            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <div className="content">
                                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                        Create Account
                                    </h1>
                                    <p className=" text-xs">
                                        Just some details to get you in!
                                    </p>
                                </div>

                                <form
                                    class="space-y-2 md:space-y-4"
                                    action="#"
                                    id="emailSignUp"
                                >
                                    <div>
                                        <label
                                            for="text"
                                            class="block mb-2 text-sm font-medium text-gray-900 "
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="name"
                                            name="name"
                                            id="name"
                                            class=" bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-700 placeholder-opacity-70"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="email"
                                            class="block mb-2 text-sm font-medium text-gray-900 "
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            class=" bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-700 placeholder-opacity-70"
                                            placeholder="johndoe@example.com"
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="tel"
                                            class="block mb-2 text-sm font-medium text-gray-900 "
                                        >
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            name="tel"
                                            id="tel"
                                            class="bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-700 placeholder-opacity-70"
                                            placeholder="0000000000"
                                            required=""
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="password"
                                            class="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="••••••••"
                                            class=" bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focyus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-700 placeholder-opacity-70"
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="password"
                                            class="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            {" "}
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            placeholder="••••••••"
                                            class=" bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-700 placeholder-opacity-70"
                                            required=""
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="profile"
                                            class="mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Upload your photo!
                                        </label>
                                        <input
                                            type="file"
                                            name="profile"
                                            id="profile"
                                            class="  text-gray-900 sm:text-sm block w-full p-2.5 placeholder-gray-700 placeholder-opacity-70"
                                            accept="image/*"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        class="w-full bg-[#0F1035] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:scale-105 duration-300"
                                        onClick={emailSignUp}
                                    >
                                        Create Account
                                    </button>
                                    <p class="text-sm  text-black">
                                        Already have an account?{" "}
                                        <Link
                                            to="/login"
                                            class="font-bold text-primary-600 hover:underline "
                                        >
                                            Log In
                                        </Link>
                                    </p>
                                </form>
                            </div>
                            <div className="flex justify-between my-2">
                                <div className=" cursor-pointer hover:underline">
                                    Terms&Conditions
                                </div>
                                <div className=" cursor-pointer hover:underline ">
                                    Support
                                </div>
                                <div className=" cursor-pointer hover:underline">
                                    Customer Care
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="image ">
                        <img
                            src={login}
                            alt=".."
                            className="hidden md:flex w-[50rem] h-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
