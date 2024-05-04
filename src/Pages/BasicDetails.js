import React from "react";
import login from "../assets/images/login.png";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useState } from "react";
import Login_Card from "./Create_Account_Card.js";
import Terms_Conditions from "./Terms_Conditions.js";
import logo from "../assets/images/logo.png";
import { FaInfoCircle } from "react-icons/fa";
import { Button } from "@material-ui/core";

export default function BasicDetails({ nextStep, handleChange, values }) {
    const { email, password, name, confirmPassword } = values;
    const [signUpClicked, setSignUpClicked] = useState(false);
    const [status, setStatus] = useState("none");
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

    const [showMyModel, setShowMyModal] = useState(false);
    const [showMyModel1, setShowMyModal1] = useState(false);
    const handleOnClose = () => setShowMyModal(false);
    const handleOnClose1 = () => setShowMyModal1(false);

    const Continue = (e) => {
        e.preventDefault();
        nextStep();
    };

    return (
        <div className="step">
            <p className="text-md text-gray-700 leading-tight text-center mt-8 mb-5">
                Create your account
            </p>
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
                />
            </div>
            <div className="mb-6">
                <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    className="w-full focus:text-gray-800 px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
                    oninput="this.className = 'w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200'"
                    onChange={(e) => handleChange(e)}
                    value={values.email}
                />
            </div>
            <div className="mb-6">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="w-full focus:text-gray-800 px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
                    oninput="this.className = 'w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200'"
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div className="mb-6">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password"
                    className="w-full focus:text-gray-800 px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
                    oninput="this.className = 'w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200'"
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div className="flex justify-center items-center gap-4">
                <Button
                    onClick={Continue}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Next
                </Button>
            </div>
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
