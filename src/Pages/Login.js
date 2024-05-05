import React from "react";
import login from "../assets/images/login.png";
import { Link } from "react-router-dom";
import { auth } from "../firebase.js";
import { useState } from "react";
import {
    linkWithPopup,
    signInWithEmailAndPassword,
    getAdditionalUserInfo,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Login_Card from "./Create_Account_Card.js";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Terms_Conditions from "./Terms_Conditions.js";
import logo from "../assets/images/logo.png";
import { getFunctions, httpsCallable } from "firebase/functions";
import Verification from "./Verfication.js";
import { FaArrowLeft } from "react-icons/fa";

export default function Login() {
    const [showMyModel1, setShowMyModal1] = useState(false);
    const handleOnClose1 = () => setShowMyModal1(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [clicked, setClicked] = useState(false);
    const [googleClicked, setGoogleClicked] = useState(false);
    const [status, setStatus] = useState("none"); // ["none", "failure"] , redirect upon success
    const [message, setMessage] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const [showMyModel, setShowMyModal] = useState(false);
    const handleOnClose = () => setShowMyModal(false);

    function emailSignIn(event) {
        event.preventDefault();
        setStatus("none");
        setClicked(true);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;

                console.log("user after logging in: ", user);
                // redirect based on role
                auth.currentUser.getIdTokenResult().then((tokenResult) => {
                    setClicked(false);
                    console.log(tokenResult.claims);
                    if (tokenResult.claims.role === "user") {
                        window.location.replace("/user/dashboard");
                    } else if (tokenResult.claims.role === "org") {
                        if (tokenResult.claims.isVerified) {
                            window.location.replace("/org/dashboard");
                        } else {
                            auth.signOut();
                            setShowMyModal1(true);
                        }
                    } else if (tokenResult.claims.role === "admin") {
                        window.location.replace("/admin");
                    } else {
                        setStatus("failure");
                        setMessage(
                            "Error occurred while logging in. Please check your credentials/network."
                        );
                        console.log("Error: Invalid role");
                        // window.location.href = "/login";
                    }
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setStatus("failure");
                setMessage(
                    "Error occurred while logging in. Please check your credentials/network."
                );
                setClicked(false);
                console.log(error);
                console.log(errorMessage);
            });
    }

    function googleSignIn() {
        var googleProvider = new GoogleAuthProvider();
        googleProvider.setCustomParameters({
            prompt: "select_account",
        });
        //     .then((result) => {
        //         // This gives you a Google Access Token. You can use it to access the Google API.
        //         console.log("Link result: ", result);
        //         auth.currentUser.getIdTokenResult().then((tokenResult) => {
        //             setClicked(false);
        //             if (tokenResult.claims.role === "user") {
        //                 window.location.replace("/user/dashboard");
        //             } else if (tokenResult.claims.role === "org") {
        //                 window.location.replace("/org/dashboard");
        //             } else {
        //                 setStatus("failure");
        //                 setMessage(
        //                     "Error occurred while logging in. Please check your credentials/network."
        //                 );
        //                 console.log("Error: Invalid role");
        //                 window.location.href = "/login";
        //             }
        //         });
        //         // ...
        //     })
        //     .catch((error) => {
        //         // Handle Errors here.
        //         setClicked(false);
        //         setStatus("failure");
        //         setMessage(
        //             "Please register using email/password first using the sign-up form."
        //         );
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         console.log(error);
        //         // The email of the user's account used.
        //         const email = error.email;
        //         // The AuthCredential type that was used.
        //         const credential =
        //             GoogleAuthProvider.credentialFromError(error);
        //         // ...
        //     });
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                console.log(result);

                auth.currentUser
                    .getIdTokenResult()
                    .then(async (tokenResult) => {
                        setGoogleClicked(true);
                        // const res = await fetch(`${process.env.REACT_APP_DEPLOYED_API_URL}/auth/user/register`);
                        const profileDets =
                            getAdditionalUserInfo(result).profile;
                        const dataToSend = new FormData();
                        dataToSend.append("name", profileDets.name);
                        dataToSend.append("email", profileDets.email);
                        dataToSend.append("firebaseId", result.user.uid);
                        const res = await fetch(
                            `${process.env.REACT_APP_DEPLOYED_API_URL}/auth/user/register/stepOne`,
                            {
                                method: "POST",
                                body: dataToSend,
                            }
                        );
                        const responseData = await res.json();
                        console.log("after fetch: ", responseData);
                        if (responseData.error !== "user already exists") {
                            const functions = getFunctions();
                            const setCustomClaims = httpsCallable(
                                functions,
                                "setCustomClaims"
                            );
                            setCustomClaims({
                                role: "user",
                                firebaseId: result.user.uid,
                            })
                                .then((result) => {
                                    console.log(
                                        "result from setCustomClaims from client: ",
                                        result
                                    );
                                    setGoogleClicked(false);

                                    window.location.replace("/user/dashboard");

                                    console.log(user);
                                })
                                .catch((err) => {
                                    setStatus("failure");
                                    setMessage(
                                        "Error occurred while logging in. Please check your credentials/network."
                                    );
                                    console.log(
                                        "error from setting custom claims:",
                                        err
                                    );
                                    setGoogleClicked(false);

                                    window.location.href = "/login";
                                });
                        } else {
                            if (tokenResult.claims.role === "user") {
                                window.location.replace("/user/dashboard");
                            } else if (tokenResult.claims.role === "org") {
                                window.location.replace("/org/dashboard");
                            } else {
                                setStatus("failure");
                                setMessage(
                                    "Error occurred while logging in. Please check your credentials/network."
                                );
                                setGoogleClicked(false);
                            }
                        }
                    });
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                setGoogleClicked(false);
                if (
                    !errorMessage.includes("(auth/cancelled-popup-request)") &&
                    !errorMessage.includes("(auth/popup-closed-by-user)")
                ) {
                    setStatus("failure");
                    setMessage(
                        "Error occurred while signing you in with google."
                    );
                    console.log(error);
                    console.log("CAUGHT LOL");
                    // The email of the user's account used.
                    const email = error.email;
                    // The AuthCredential type that was used.
                    const credential =
                        GoogleAuthProvider.credentialFromError(error);
                    // ...
                }
            });
    }

    return (
        <div className=' absolute -z-10 bg-[url("./assets/images/authBg.jpg")]  h-full w-screen r'>
            <div className=" flex justify-center items-center">
                <div className="flex flex-col  px-6 py-8 w-[50rem]  items-center justify-center md:h-screen lg:py-0 ">
                    <div className="w-full rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 bg-[#9db39b] ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <FaArrowLeft
                                onClick={() => {
                                    window.location.href = "/";
                                }}
                                className=" scale-125 duration-150 cursor-pointer text-xl"
                            />
                            <div className="flex flex-col">
                                <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                    Login
                                </h1>
                                <p className=" text-xs text-center">
                                    Glad you're back!
                                </p>
                            </div>
                            <form
                                className="space-y-4 md:space-y-6"
                                action="#"
                                id="userLoginForm"
                            >
                                <div>
                                    <label
                                        for="text"
                                        className="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className=" bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-700 placeholder-opacity-70"
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
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className=" bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-700 placeholder-opacity-70"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />
                                    {status === "failure" ? (
                                        <p className="text-sm text-red-500">
                                            {message}
                                        </p>
                                    ) : null}
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                                                required=""
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label
                                                for="remember"
                                                className="text-black font-medium"
                                            >
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <Link
                                        to="/login/forgetpassword"
                                        className="text-sm font-medium text-primary-600 hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                {!clicked ? (
                                    <button
                                        type="submit"
                                        className="w-full bg-[#277868] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:scale-105 duration-300"
                                        onClick={emailSignIn}
                                    >
                                        Sign in
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="w-full bg-[#5a5d5f] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:scale-105 duration-300"
                                        disabled
                                    >
                                        Signing you in...
                                    </button>
                                )}
                            </form>
                            <p className="text-center">or</p>
                            <button
                                aria-label="Sign in with Google"
                                className="w-full flex justify-center items-center bg-white border border-button-border-light  rounded-lg p-0.5 pr-3 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:scale-105 duration-300"
                                onClick={googleSignIn}
                            >
                                {!googleClicked && (
                                    <div className="flex items-center justify-center bg-white w-9 h-9 rounded-l">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            className="w-5 h-5"
                                        >
                                            <title>Sign in with Google</title>
                                            <desc>Google G Logo</desc>
                                            <path
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                className="fill-google-logo-blue"
                                            ></path>
                                            <path
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                className="fill-google-logo-green"
                                            ></path>
                                            <path
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                className="fill-google-logo-yellow"
                                            ></path>
                                            <path
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                className="fill-google-logo-red"
                                            ></path>
                                        </svg>
                                    </div>
                                )}
                                <span className="text-sm text-google-text-gray">
                                    {!googleClicked ? (
                                        "Sign in with Google"
                                    ) : (
                                        <div role="status">
                                            <svg
                                                aria-hidden="true"
                                                class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                                viewBox="0 0 100 101"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                    fill="currentFill"
                                                />
                                            </svg>
                                            <span class="sr-only">
                                                Loading...
                                            </span>
                                        </div>
                                    )}
                                </span>
                            </button>
                            {/* <button
                                    type="submit"
                                    className="flex justify-center w-full bg-[#0F1035] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:scale-105 duration-300"
                                    onClick={googleSignIn}
                                >
                                    <div className="flex">
                                        <svg
                                            className="mr-2 -ml-1 w-4 h-4"
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

                            <p className="text-sm  text-black">
                                Don't have an account yet?{" "}
                                <Link
                                    to="/signup"
                                    className="font-bold text-primary-600 hover:underline "
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>
                        <div className="flex justify-around my-2">
                            <a onClick={() => setShowMyModal(true)} href="#">
                                <div className=" cursor-pointer hover:underline">
                                    Terms&Conditions
                                </div>
                            </a>
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
                {/* <div className="image">
                    <img
                        src={login}
                        alt=".."
                        className="  hidden md:flex md:w-[50rem] md:h-auto"
                    />
                </div> */}
            </div>
            <Terms_Conditions onClose={handleOnClose} visible={showMyModel} />
            <Verification onClose={handleOnClose1} visible={showMyModel1} />
        </div>
    );
}
