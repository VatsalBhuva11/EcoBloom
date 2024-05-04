import React, { useEffect, useState } from "react";
import login from "../assets/images/login.png";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { getFunctions, httpsCallable } from "firebase/functions";
import Login_Card from "./Create_Account_Card.js";
import Terms_Conditions from "./Terms_Conditions.js";
import logo from "../assets/images/logo.png";
import { FaInfoCircle } from "react-icons/fa";

export default function BasicDetails({
    nextStep,
    prevStep,
    handleChange,
    values,
}) {
    const { email, password, name, confirmPassword, stepCount } = values;
    const formBasic = { email, password, name, confirmPassword };
    const [signUpClicked, setSignUpClicked] = useState(false);
    const [status, setStatus] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    function emailSignUp(event) {
        event.preventDefault();
        setSignUpClicked(true);
        setStatus("none");
        // let files = document.querySelector('input[type="file"]').files;
        let formData = new FormData(document.getElementById("emailSignUp"));

        //     .then((userCredential) => {
        //         // Signed Up
        //         console.log("User in Firebase");
        //         const user = userCredential.user;
        //         console.log(user);
        //         setShowMyModal(true);
        //         setSignUpClicked(false);
        //         setStatus("success");

        //         // ...
        //     })
        //     .catch((error) => {
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         // ..
        //         console.log(error);
        //         setStatus("failure");
        //         setSignUpClicked(false);
        //     });
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed Up
                console.log("User in Firebase: ", userCredential.user);
                const user = userCredential.user;
                const userData = {
                    role: "user",
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
                    `${process.env.REACT_APP_DEPLOYED_API_URL}/auth/user/register`,
                    {
                        method: "POST",
                        body: formData,
                    }
                )
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.status === "error") {
                            setSignUpClicked(false);
                            auth.currentUser.delete();
                            console.log(data);
                            throw new Error(
                                "Invalid form input. Please check again,"
                            );
                        } else {
                            console.log("User in DB: ");
                            console.log(data);
                            setCustomClaims(userData)
                                .then((result) => {
                                    console.log(
                                        "result from setCustomClaims from client: ",
                                        result
                                    );
                                    console.log(user);
                                    setShowMyModal(true);
                                    setSignUpClicked(false);
                                    setStatus("success");
                                })
                                .catch((err) => {
                                    console.log(err);
                                    setSignUpClicked(false);
                                    setStatus("failure");
                                });

                            console.log("Success:", data);
                        }
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                        setStatus("failure");
                        setSignUpClicked(false);
                    });

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(error);
                setStatus("failure");
                setSignUpClicked(false);
            });
    }

    useEffect(() => {
        if (password && password !== confirmPassword)
            setStatus("Passwords do not match!");
    }, []);

    const [showMyModel, setShowMyModal] = useState(false);
    const [showMyModel1, setShowMyModal1] = useState(false);
    const handleOnClose = () => setShowMyModal(false);
    const handleOnClose1 = () => setShowMyModal1(false);

    function validateForm() {
        if (Object.values(formBasic).some((x) => x === null || x === "")) {
            setStatus("Please enter all the fields.");
            console.log("NOT OKAY");
            return false;
        }
        if (password !== confirmPassword) {
            setStatus("Passwords do not match!");
            console.log("NOT OKAY");
            return false;
        }
        if (password.length < 6) {
            setStatus("Password length must be >= 6");
            console.log("NOT OKAY");
            return false;
        }
        return true;
    }

    const Continue = (e) => {
        console.log(e);
        e.preventDefault();
        setSignUpClicked(true);
        console.log("BEFORE VALIDATION");
        if (!validateForm()) {
            setSignUpClicked(false);
            return;
        }
        let formData = new FormData(document.getElementById("userSignUpOne"));
        console.log("OK");
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed Up
                console.log("User in Firebase: ", userCredential.user);
                const user = userCredential.user;
                const userData = {
                    role: "user",
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
                    `${process.env.REACT_APP_DEPLOYED_API_URL}/auth/user/register/stepOne`,
                    {
                        method: "POST",
                        body: formData,
                    }
                )
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.status === "error") {
                            setSignUpClicked(false);
                            auth.currentUser.delete();
                            console.log(data);
                            throw new Error(
                                "Invalid form input. Please check again,"
                            );
                        } else {
                            console.log("User in DB: ");
                            console.log(data);
                            setCustomClaims(userData)
                                .then((result) => {
                                    console.log(
                                        "result from setCustomClaims from client: ",
                                        result
                                    );
                                    console.log(user);
                                    nextStep();
                                })
                                .catch((err) => {
                                    console.log(err);
                                    console.log(err.message);
                                    auth.currentUser.delete();
                                    setSignUpClicked(false);
                                    setStatus("failure in custom claims");
                                });

                            console.log("Success:", data);
                        }
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                        console.log("errormessage: ", error.message);
                        auth.currentUser.delete();
                        setStatus("failure");
                        setSignUpClicked(false);
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(error);
                if (
                    errorMessage.includes(
                        "Firebase: Error (auth/email-already-in-use)."
                    )
                ) {
                    setStatus("Email is already in use.");
                } else if (errorMessage.includes("auth/invalid-email")) {
                    setStatus("Please enter a valid email address.");
                } else {
                    setStatus(
                        "Error occurred while signing you up. Please try again."
                    );
                }
                console.log(errorMessage);
                setSignUpClicked(false);
            });
    };

    return (
        <div className="relative top-4 flex flex-col justify-center items-center w-1/2 min-h-fit p-12 py-4 shadow-md rounded-2xl bg-white mx-auto border-solid border-2 border-gray-100 mb-8">
            <h1 className="text-xl font-extrabold">
                Join us as a participant!
            </h1>

            <form className="step relative top-4" id="userSignUpOne">
                {/* <p className="text-md text-gray-700 leading-tight text-center mt-8 mb-5">
                    Create your account
                </p> */}
                <div className="mb-6">
                    <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        id="name"
                        className="w-full focus:text-gray-800 px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
                        oninput="this.className = 'w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200'"
                        onChange={(e) => handleChange(e)}
                        value={values.name}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        id="email"
                        className="w-full focus:text-gray-800 px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
                        oninput="this.className = 'w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200'"
                        onChange={(e) => handleChange(e)}
                        value={values.email}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        id="password"
                        className="w-full focus:text-gray-800 px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
                        oninput="this.className = 'w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200'"
                        onChange={(e) => {
                            handleChange(e);
                            let tempPass = e.target.value;
                            if (tempPass && tempPass !== confirmPassword) {
                                setStatus("Passwords do not match!");
                            } else {
                                setStatus(null);
                            }
                        }}
                        value={password}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="confirmPassword"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        id="confirmPassword"
                        className="w-full focus:text-gray-800 px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
                        oninput="this.className = 'w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200'"
                        onChange={(e) => {
                            handleChange(e);
                            let tempPass = e.target.value;
                            if (tempPass && tempPass !== password) {
                                setStatus("Passwords do not match!");
                            } else {
                                setStatus(null);
                            }
                        }}
                        value={confirmPassword}
                        required
                    />
                </div>
                {status !== null && (
                    <div className="text-center font-light pb-2 text-red-500">
                        {status}
                    </div>
                )}
                <div className="flex justify-center items-center pb-12 gap-4">
                    <div className="action-buttons">
                        {/* <button
                            id="prev"
                            disabled={stepCount === 1}
                            onClick={() => {
                                prevStep();
                            }}
                        >
                            Prev
                        </button> */}
                        <button
                            id="next"
                            disabled={stepCount === 4}
                            onClick={(e) => {
                                Continue(e);
                                // nextStep();
                            }}
                        >
                            {!signUpClicked ? (
                                "Next"
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
                                    <span class="sr-only">Loading...</span>
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
    // return (
    //     <div className="h-screen">
    //         <div className=" bg-[#fbfbfa] flex">
    //             <Link to="/">
    //                 <img
    //                     className="h-12  hover:scale-105 duration-300 md:h-16 "
    //                     src={logo}
    //                     alt=""
    //                 />
    //             </Link>
    //             <div className=" flex justify-between items-center">
    //                 <div className="flex flex-col px-6 py-8 w-[50rem] justify-center md:h-screen lg:py-0 ">
    //                     <div className="w-full rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 bg-gradient-to-b from-[#9db39b] to-transparent">
    //                         <div className="p-1 space-y-1 md:space-y-2 sm:p-3 px-4">
    //                             <div className="content">
    //                                 <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
    //                                     Create Account
    //                                 </h1>
    //                                 <p className=" text-xs">
    //                                     Just some details to get you in!
    //                                 </p>
    //                             </div>

    //                             <form
    //                                 className="space-y-2 md:space-y-4"
    //                                 action="#"
    //                                 id="emailSignUp"
    //                             >
    //                                 <div>
    //                                     <label
    //                                         for="text"
    //                                         className="block mb-2 text-sm font-medium text-gray-900 "
    //                                     >
    //                                         Name<sup> *</sup>
    //                                     </label>
    //                                     <input
    //                                         type="name"
    //                                         name="name"
    //                                         id="name"
    //                                         className=" bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-700 placeholder-opacity-70"
    //                                         placeholder="John Doe"
    //                                         required
    //                                     />
    //                                 </div>
    //                                 <div>
    //                                     <label
    //                                         for="email"
    //                                         className="block mb-2 text-sm font-medium text-gray-900 "
    //                                     >
    //                                         Email<sup> *</sup>
    //                                     </label>
    //                                     <input
    //                                         type="email"
    //                                         name="email"
    //                                         id="email"
    //                                         className=" bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-700 placeholder-opacity-70"
    //                                         placeholder="johndoe@example.com"
    //                                         onChange={(e) =>
    //                                             setEmail(e.target.value)
    //                                         }
    //                                         required
    //                                     />
    //                                 </div>
    //                                 <div>
    //                                     <label
    //                                         for="tel"
    //                                         className="block mb-2 text-sm font-medium text-gray-900 "
    //                                     >
    //                                         Phone
    //                                     </label>
    //                                     <input
    //                                         type="tel"
    //                                         name="tel"
    //                                         id="tel"
    //                                         className="bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-700 placeholder-opacity-70"
    //                                         placeholder="0000000000"
    //                                     />
    //                                 </div>
    //                                 <div>
    //                                     <label
    //                                         for="password"
    //                                         className="block mb-2 text-sm font-medium text-gray-900"
    //                                     >
    //                                         Password<sup> *</sup>
    //                                     </label>
    //                                     <input
    //                                         type="password"
    //                                         name="password"
    //                                         id="password"
    //                                         placeholder="••••••••"
    //                                         className=" bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focyus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-700 placeholder-opacity-70"
    //                                         onChange={(e) =>
    //                                             setPassword(e.target.value)
    //                                         }
    //                                         required
    //                                     />
    //                                 </div>
    //                                 <div>
    //                                     <label
    //                                         for="password"
    //                                         className="block mb-2 text-sm font-medium text-gray-900"
    //                                     >
    //                                         Confirm Password<sup> *</sup>
    //                                     </label>
    //                                     <input
    //                                         type="password"
    //                                         name="confirmPassword"
    //                                         id="confirmPassword"
    //                                         placeholder="••••••••"
    //                                         className=" bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-700 placeholder-opacity-70"
    //                                         required
    //                                         onChange={(e) =>
    //                                             setConfirmPassword(
    //                                                 e.target.value
    //                                             )
    //                                         }
    //                                     />
    //                                 </div>
    //                                 <div>
    //                                     <label
    //                                         className="block mb-2 text-sm font-medium text-[#0f1035]"
    //                                         for="file_input"
    //                                     >
    //                                         <div className="flex items-center">
    //                                             <div className="mr-1">
    //                                                 Upload Photo<sup>*</sup>
    //                                             </div>
    //                                             <div className="flex ">
    //                                                 <div
    //                                                     onMouseOver={() =>
    //                                                         setIsOpen(true)
    //                                                     }
    //                                                     onClick={() =>
    //                                                         setIsOpen(!isOpen)
    //                                                     }
    //                                                     onMouseOut={() =>
    //                                                         setIsOpen(false)
    //                                                     }
    //                                                     className="text-lg cursor-pointer "
    //                                                 >
    //                                                     <FaInfoCircle />
    //                                                 </div>
    //                                                 {isOpen && (
    //                                                     <div
    //                                                         onMouseOver={() =>
    //                                                             setIsOpen(true)
    //                                                         }
    //                                                         onMouseOut={() =>
    //                                                             setIsOpen(false)
    //                                                         }
    //                                                         className={
    //                                                             "flex flex-col absolute z-10 md:left-[30px] md:bottom-[180px] bg-white  p-2 rounded-lg ml-6 border-black "
    //                                                         }
    //                                                     >
    //                                                         <div className=" text-[20px]">
    //                                                             &rarr; Clear
    //                                                             picture of your{" "}
    //                                                             <strong>
    //                                                                 face
    //                                                             </strong>{" "}
    //                                                             with size less
    //                                                             than{" "}
    //                                                             <strong>
    //                                                                 100kb
    //                                                             </strong>
    //                                                         </div>
    //                                                         <div className="text-[20px]">
    //                                                             &rarr; Square
    //                                                             photo
    //                                                             (preferably
    //                                                             passport sized)
    //                                                         </div>
    //                                                         <div className="text-[20px]">
    //                                                             &rarr; Format of
    //                                                             the image should
    //                                                             be either JPG,
    //                                                             JPEg or PNG
    //                                                         </div>
    //                                                         <div className="text-[20px]">
    //                                                             &rarr; Face
    //                                                             should be
    //                                                             clearly visible
    //                                                         </div>
    //                                                     </div>
    //                                                 )}
    //                                             </div>
    //                                         </div>
    //                                     </label>
    //                                     <input
    //                                         className="block w-full text-sm  file:bg-[#0f1035]  file:text-white file:p-2 file:rounded-lg file:font-bold file:hover:scale-105 file:duration-300 rounded-lg cursor-pointer focus:outline-none bg-transparent text-[#0f1035]"
    //                                         aria-describedby="file_input_help"
    //                                         id="profile"
    //                                         name="profile"
    //                                         type="file"
    //                                         accept="image/*"
    //                                         required
    //                                     />
    //                                 </div>
    //                                 <div className="flex items-center gap-2">
    //                                     <input
    //                                         type="checkbox"
    //                                         required
    //                                         name="agree"
    //                                         id="agree"
    //                                     />
    //                                     <label for="agree">
    //                                         I agree to the{" "}
    //                                         <a
    //                                             onClick={() =>
    //                                                 setShowMyModal1(true)
    //                                             }
    //                                             href="#"
    //                                             className="hover:underline"
    //                                         >
    //                                             terms and conditions<sup>*</sup>
    //                                         </a>
    //                                     </label>
    //                                 </div>

    //                                 {!signUpClicked ? (
    //                                     <button
    //                                         type="submit"
    //                                         className="w-full bg-[#0F1035] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:scale-105 duration-300"
    //                                         onClick={emailSignUp}
    //                                     >
    //                                         Create Account
    //                                     </button>
    //                                 ) : (
    //                                     <button
    //                                         type="submit"
    //                                         className="w-full bg-[#5a5d5f] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:scale-105 duration-300"
    //                                         disabled
    //                                     >
    //                                         Creating Account...
    //                                     </button>
    //                                 )}
    //                                 {status === "success" ? (
    //                                     <a className="text-md text-green-500 font-bold">
    //                                         ✅ Successfully registered user!{" "}
    //                                         <a
    //                                             href="/login"
    //                                             className="underline"
    //                                         >
    //                                             Please login to continue.
    //                                         </a>
    //                                     </a>
    //                                 ) : status === "failure" ? (
    //                                     <p className="text-md text-red-500">
    //                                         Error occurred while registering
    //                                         user. Please try again.
    //                                     </p>
    //                                 ) : null}
    //                                 <p className="text-sm  text-black">
    //                                     Already have an account?{" "}
    //                                     <Link
    //                                         to="/login"
    //                                         className="font-bold text-primary-600 hover:underline "
    //                                     >
    //                                         Log In
    //                                     </Link>
    //                                 </p>
    //                             </form>
    //                         </div>
    //                         {/* <div className="flex justify-around my-2">
    //                         <a
    //                                  onClick={() => setShowMyModal1(true)}
    //                                  href="#"
    //                             ><div className=" cursor-pointer hover:underline">
    //                                 Terms&Conditions
    //                             </div></a>
    //                             <div className=" cursor-pointer hover:underline ">
    //                                 Support
    //                             </div>
    //                             <div className=" cursor-pointer hover:underline">
    //                                 Customer Care
    //                             </div>
    //                         </div> */}
    //                     </div>
    //                 </div>
    //                 <div className="image ">
    //                     <img
    //                         src={login}
    //                         alt=".."
    //                         className="hidden md:flex w-[50rem] h-auto"
    //                     />
    //                 </div>
    //             </div>
    //         </div>

    //         <Login_Card onClose={handleOnClose} visible={showMyModel} />
    //         <Terms_Conditions onClose={handleOnClose1} visible={showMyModel1} />
    //     </div>
    // );
}
