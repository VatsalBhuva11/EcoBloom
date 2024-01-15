import React from "react";
import login from "../assets/images/login.png";
import { Link } from "react-router-dom";
import { auth } from "../firebase.js";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function emailSignIn(event) {
        event.preventDefault();

        fetch(`${process.env.REACT_APP_LOCAL_API_URL}/auth/user/login`, {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((token) =>
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed in
                        const user = userCredential.user;
                        console.log("Signed in! ", user);
                        localStorage.setItem("accountData", token.data);
                        console.log("Set token in LS");
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(error);
                    })
            )
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <div className="h-screen">
            <div className=" bg-[#EEF0E5] h-screen">
                <div className=" flex justify-between items-center">
                    <div class="flex flex-col items-center px-6 py-8 w-[50rem] justify-center md:h-screen lg:py-0 ">
                        <div class="w-full rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 bg-gradient-to-b from-[#9db39b] to-transparent">
                            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <div className="content">
                                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                        Login
                                    </h1>
                                    <p className=" text-xs">
                                        Glad you're back!
                                    </p>
                                </div>

                                <form
                                    class="space-y-4 md:space-y-6"
                                    action="#"
                                    id="userLoginForm"
                                >
                                    <div>
                                        <label
                                            for="text"
                                            class="block mb-2 text-sm font-medium text-gray-900 "
                                        >
                                            Your Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            class=" bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-700 placeholder-opacity-70"
                                            placeholder="Email"
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            required
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
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-start">
                                            <div class="flex items-center h-5">
                                                <input
                                                    id="remember"
                                                    aria-describedby="remember"
                                                    type="checkbox"
                                                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                                                    required=""
                                                />
                                            </div>
                                            <div class="ml-3 text-sm">
                                                <label
                                                    for="remember"
                                                    class="text-black font-medium"
                                                >
                                                    Remember me
                                                </label>
                                            </div>
                                        </div>
                                        <a
                                            href="#"
                                            class="text-sm font-medium text-primary-600 hover:underline"
                                        >
                                            Forgot password?
                                        </a>
                                    </div>
                                    <button
                                        type="submit"
                                        class="w-full bg-[#0F1035] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:scale-105 duration-300"
                                        onClick={emailSignIn}
                                    >
                                        Sign in
                                    </button>
                                    <p class="text-sm  text-black">
                                        Don't have an account yet?{" "}
                                        <Link
                                            to="/signup"
                                            class="font-bold text-primary-600 hover:underline "
                                        >
                                            Sign up
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
                    <div className="image">
                        <img
                            src={login}
                            alt=".."
                            className=" w-[50rem] h-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
