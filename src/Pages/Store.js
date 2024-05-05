import React, { useState, useEffect } from "react";
import logo from "../assets/images/logo.png";
import shirt from "../assets/images/shirt.png";
import bag from "../assets/images/bag.png";
import cap from "../assets/images/cap (2).png";
import hoodie from "../assets/images/hoodie.png";
import keychain from "../assets/images/keychain (2).png";
import book from "../assets/images/book.png";
import { SiDogecoin } from "react-icons/si";
import { Link } from "react-router-dom";
import Store_Error from "./Store_Error";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { HashLoader } from "react-spinners";
import { jwtDecode } from "jwt-decode";
import Loader from "../assets/images/Animation.gif";


const Store = () => {
    const [showMyModel, setShowMyModal] = useState(false);
    const handleOnClose = () => setShowMyModal(false);
    const [user, loading, error] = useAuthState(auth);
    const [loader, setLoader] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState({});

    useEffect(() => {
        setLoader(true);
        if (auth.currentUser) {
            console.log("AUTH CURRENT USER");
            auth.currentUser.getIdToken().then((idToken) => {
                const idTokenResult = jwtDecode(idToken);
                if (idTokenResult.role === "org") {
                    window.location.replace("/org/dashboard");
                    // <Navigate to = 'org/dashboard'  replace  = {true}/>
                }
                fetch(
                    `${process.env.REACT_APP_DEPLOYED_API_URL}/user/${idTokenResult.user_id}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            authorization: `Bearer ${idToken}`,
                        },
                    }
                )
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        if (data.status === "OK") {
                            setLoggedInUser(data.data);
                            setLoader(false);
                        } else {
                            console.log(data);
                            setLoader(false);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        setLoader(false);
                    });
            });
        } else {
            alert("Not Authorised");
        }
    }, [loading]);

    if (loading || loader) {
        return (
            <div className="h-screen flex items-center justify-center">
                <img src={Loader} height={200} width={200}></img>
            </div>
        );
    }


    if (!loading && !user) {
        window.location.replace("/login");
    }
    return (
        <div className=" h-full bg-[#fbfbfa] ">
            <div>
                <div className="flex justify-between">
                    <div className="flex">
                        <Link to="/">
                            <img
                                className="h-24 hover:scale-105 duration-300 mt-4"
                                src={logo}
                                alt=""
                            />
                        </Link>

                        <h1 className="text-3xl md:text-4xl font-bold mt-9 text-[#277868]">
                            REWARDS & PRIZES
                        </h1>
                    </div>

                    <div className="hidden md:flex cursor-pointer mt-10 mr-[60px]">
                        <p className=" text-xl font-light pt-1 ">
                            Your Points:{" "}
                        </p>
                        <p className="pl-2 flex text-2xl font-bold   text-[#277868]">
                            <SiDogecoin className=" mr-1 mt-1 text-[#FFCC4D]" />{" "}
                            {Number(loggedInUser.points)}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-12 content-center mt-8 pb-6">
                    <div className="flex justify-center items-center">
                        <div className="bg-gray-200 rounded-lg hover:scale-105 duration-300 w-fit shadow-2xl flex flex-col justify-center">
                            <div>
                                <img src={shirt} className="p-2" alt="tshirt" />
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <h5 className="p-4 text-md md:text-xl text-gray-900">
                                        EcoBloom T-Shirt
                                    </h5>{" "}
                                </div>
                                <div className="px-4 py-2">
                                    {Number(Number(loggedInUser.points)) >=
                                    1000 ? (
                                        <button
                                            onClick={() => {
                                                window.location.href =
                                                    "/store/order?item=tshirt";
                                            }}
                                            className="bg-[#277868] rounded-lg "
                                        >
                                            <a className="flex text-white text-sm md:text-xl px-2 py-1 ">
                                                1000{" "}
                                                <SiDogecoin className="mt-1 ml-2 text-[#FFCC4D]" />
                                            </a>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setShowMyModal(true);
                                            }}
                                            className="bg-[#277868] rounded-lg "
                                        >
                                            <a className="flex text-white text-sm md:text-xl px-2 py-1 ">
                                                1000{" "}
                                                <SiDogecoin className="mt-1 ml-2 text-[#FFCC4D]" />
                                            </a>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center items-center">
                        <div className="bg-gray-200 rounded-lg hover:scale-105 duration-300 w-fit shadow-2xl flex flex-col">
                            <div>
                                <img src={cap} className="p-2" alt="cap" />
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <h5 className="p-4 text-md md:text-xl text-gray-900">
                                        EcoBloom Cap
                                    </h5>{" "}
                                </div>
                                <div className="px-4 py-2">
                                    {Number(loggedInUser.points) >= 500 ? (
                                        <button
                                            onClick={() => {
                                                window.location.href =
                                                    "/store/order?item=cap";
                                            }}
                                            className="bg-[#277868] rounded-lg "
                                        >
                                            <a className="flex text-white text-sm md:text-xl px-2 py-1 ">
                                                500{" "}
                                                <SiDogecoin className="mt-1 ml-2 text-[#FFCC4D]" />
                                            </a>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setShowMyModal(true);
                                            }}
                                            className="bg-[#277868] rounded-lg "
                                        >
                                            <a className="flex text-white text-sm md:text-xl px-2 py-1 ">
                                                500{" "}
                                                <SiDogecoin className="mt-1 ml-2 text-[#FFCC4D]" />
                                            </a>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center items-center">
                        <div className="bg-gray-200 w-fit hover:scale-105 duration-300 rounded-lg shadow-2xl flex flex-col">
                            <div>
                                <img src={bag} className="p-2" alt="bag" />
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <h5 className="p-4 text-md md:text-xl text-gray-900 ">
                                        EcoBloom JuteBag
                                    </h5>{" "}
                                </div>
                                <div className="px-4 py-2">
                                    {Number(loggedInUser.points) >= 2000 ? (
                                        <button
                                            onClick={() => {
                                                window.location.href =
                                                    "/store/order?item=jutebag";
                                            }}
                                            className="bg-[#277868] rounded-lg "
                                        >
                                            <a className="flex text-white text-sm md:text-xl px-2 py-1 ">
                                                2000{" "}
                                                <SiDogecoin className="mt-1 ml-2 text-[#FFCC4D]" />
                                            </a>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setShowMyModal(true);
                                            }}
                                            className="bg-[#277868] rounded-lg "
                                        >
                                            <a className="flex text-white text-sm md:text-xl px-2 py-1 ">
                                                2000{" "}
                                                <SiDogecoin className="mt-1 ml-2 text-[#FFCC4D]" />
                                            </a>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center items-center">
                        <div className="bg-gray-200 w-fit hover:scale-105 duration-300 rounded-lg shadow-2xl flex flex-col">
                            <div>
                                <img
                                    src={hoodie}
                                    className="p-2"
                                    alt="hoodie"
                                />
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <h5 className="p-4 text-md md:text-xl text-gray-900 ">
                                        EcoBloom Hoodie
                                    </h5>{" "}
                                </div>
                                <div className="px-4 py-2">
                                    {Number(loggedInUser.points) >= 4000 ? (
                                        <button
                                            onClick={() => {
                                                window.location.href =
                                                    "/store/order?item=hoodie";
                                            }}
                                            className="bg-[#277868] rounded-lg "
                                        >
                                            <a className="flex text-white text-sm md:text-xl px-2 py-1 ">
                                                4000{" "}
                                                <SiDogecoin className="mt-1 ml-2 text-[#FFCC4D]" />
                                            </a>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setShowMyModal(true);
                                            }}
                                            className="bg-[#277868] rounded-lg "
                                        >
                                            <a className="flex text-white text-sm md:text-xl px-2 py-1 ">
                                                4000{" "}
                                                <SiDogecoin className="mt-1 ml-2 text-[#FFCC4D]" />
                                            </a>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center items-center">
                        <div className="bg-gray-200 w-fit hover:scale-105 duration-300 rounded-lg shadow-2xl flex flex-col">
                            <div>
                                <img src={book} className="p-2" alt="book" />
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <h5 className="p-4 text-md md:text-xl text-gray-900 ">
                                        EcoBloom Notebook
                                    </h5>{" "}
                                </div>
                                <div className="px-4 py-2">
                                    {Number(loggedInUser.points) >= 1500 ? (
                                        <button
                                            onClick={() => {
                                                window.location.href =
                                                    "/store/order?item=book";
                                            }}
                                            className="bg-[#277868] rounded-lg "
                                        >
                                            <a className="flex text-white text-sm md:text-xl px-2 py-1 ">
                                                1500{" "}
                                                <SiDogecoin className="mt-1 ml-2 text-[#FFCC4D]" />
                                            </a>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setShowMyModal(true);
                                            }}
                                            className="bg-[#277868] rounded-lg "
                                        >
                                            <a className="flex text-white text-sm md:text-xl px-2 py-1 ">
                                                1500{" "}
                                                <SiDogecoin className="mt-1 ml-2 text-[#FFCC4D]" />
                                            </a>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center items-center">
                        <div className="bg-gray-200 w-fit hover:scale-105 duration-300 rounded-lg shadow-2xl flex flex-col">
                            <div>
                                <img
                                    src={keychain}
                                    className="p-2"
                                    alt="keychain"
                                />
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <h5 className="p-4 text-md md:text-xl text-gray-900 ">
                                        EcoBloom Keychain
                                    </h5>{" "}
                                </div>
                                <div className="px-4 py-2">
                                    {Number(loggedInUser.points) >= 400 ? (
                                        <button
                                            onClick={() => {
                                                window.location.href =
                                                    "/store/order?item=keychain";
                                            }}
                                            className="bg-[#277868] rounded-lg "
                                        >
                                            <a className="flex text-white text-sm md:text-xl px-2 py-1 ">
                                                400{" "}
                                                <SiDogecoin className="mt-1 ml-2 text-[#FFCC4D]" />
                                            </a>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setShowMyModal(true);
                                            }}
                                            className="bg-[#277868] rounded-lg"
                                        >
                                            <a className="flex text-white text-sm md:text-xl px-2 py-1 ">
                                                400{" "}
                                                <SiDogecoin className="mt-1 ml-2 text-[#FFCC4D]" />
                                            </a>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Store_Error onClose={handleOnClose} visible={showMyModel} />
        </div>
    );
};

export default Store;
