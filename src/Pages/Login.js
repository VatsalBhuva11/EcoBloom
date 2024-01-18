import React from "react";
import login from "../assets/images/login.png";
import { Link } from "react-router-dom";
import { auth } from "../firebase.js";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [clicked, setClicked] = useState(false);
    const [status, setStatus] = useState("none"); // ["none", "failure"] , redirect upon success
    const [user, loading, error] = useAuthState(auth);

    function emailSignIn(event) {
        event.preventDefault();
        setStatus("none");
        setClicked(true);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                // redirect based on role
                auth.currentUser.getIdTokenResult().then((tokenResult) => {
                    setClicked(false);
                    if (tokenResult.claims.role === "user") {
                        window.location.replace("/user/dashboard");
                    } else if (tokenResult.claims.role === "org") {
                        window.location.replace("/org/dashboard");
                    } else {
                        setStatus("failure");
                        console.log("Error: Invalid role");
                        window.location.href = "/login";
                    }
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setStatus("failure");
                setClicked(false);
                console.log(error);
            });
    }

    function googleSignIn() {
        var googleProvider = new GoogleAuthProvider();
        googleProvider.setCustomParameters({
            prompt: "select_account",
        });
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user);
                window.location.replace("/user/dashboard");
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error);
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                // ...
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
                                        {status === "failure" ? (
                                            <p class="text-sm text-red-500">
                                                Error occurred while logging in.
                                                Please check your
                                                credentials/network.
                                            </p>
                                        ) : null}
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

                                    {!clicked ? (
                                        <button
                                            type="submit"
                                            class="w-full bg-[#0F1035] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:scale-105 duration-300"
                                            onClick={emailSignIn}
                                        >
                                            Sign in
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            class="w-full bg-[#5a5d5f] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:scale-105 duration-300"
                                            disabled
                                        >
                                            Signing you in...
                                        </button>
                                    )}
                                </form>
                                <p className="text-center">or</p>
                                <button
                                    aria-label="Sign in with Google"
                                    class="w-full flex justify-center items-center bg-white border border-button-border-light  rounded-lg p-0.5 pr-3 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:scale-105 duration-300"
                                    onClick={googleSignIn}
                                >
                                    <div class="flex items-center justify-center bg-white w-9 h-9 rounded-l">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            class="w-5 h-5"
                                        >
                                            <title>Sign in with Google</title>
                                            <desc>Google G Logo</desc>
                                            <path
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                class="fill-google-logo-blue"
                                            ></path>
                                            <path
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                class="fill-google-logo-green"
                                            ></path>
                                            <path
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                class="fill-google-logo-yellow"
                                            ></path>
                                            <path
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                class="fill-google-logo-red"
                                            ></path>
                                        </svg>
                                    </div>
                                    <span class="text-sm text-google-text-gray tracking-wider ">
                                        Sign in with Google
                                    </span>
                                </button>
                                {/* <button
                                    type="submit"
                                    class="flex justify-center w-full bg-[#0F1035] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:scale-105 duration-300"
                                    onClick={googleSignIn}
                                >
                                    <div className="flex">
                                        <svg
                                            class="mr-2 -ml-1 w-4 h-4"
                                            aria-hidden="true"
                                            focusable="false"
                                            data-prefix="fab"
                                            data-icon="google"
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 488 512"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                                            ></path>
                                        </svg>{" "}
                                        <p>Google Sign-in</p>
                                    </div>
                                </button> */}

                                <p class="text-sm  text-black">
                                    Don't have an account yet?{" "}
                                    <Link
                                        to="/signup"
                                        class="font-bold text-primary-600 hover:underline "
                                    >
                                        Sign up
                                    </Link>
                                </p>
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
