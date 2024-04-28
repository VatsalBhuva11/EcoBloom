import React from "react";
import logout_logo from "../assets/images/logout_image.png";
import { Link, Navigate } from "react-router-dom";

const Verification = ({ visible, onClose }) => {
    const handleOnClose = (e) => {
        if (e.target.id === "container") onClose();
    };

    if (!visible) return null;

    return (
        <div
            id="container"
            onClick={handleOnClose}
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
        >
            <div className="bg-[#CDE1C9] p-4 rounded w-92 flex flex-col justify-center ">
                <div className="flex justify-center items-center">
                    <div>
                        <img src={logout_logo} alt="" />
                    </div>
                </div>
                <div className="sm:text-xl text-md text-center font-bold text-[#1C1C1C] flex justify-center">
                    Please wait for the
                    <br /> Organisation to be verified.
                </div>
                <div className="text-sm text-center pt-2 text-[#1C1C1C] flex justify-center">
                    Mail us for help at: ecobloom7@gmail.com
                </div>
                <div className="flex justify-around mt-7 mb-5">
                    <button
                        className="text-lg bg-[#fbfbfa] text-[#0F1035] w-32 h-8 rounded-lg border-2 border-[#0F1035]"
                        onClick={() => {
                            document.querySelector("#container").click();
                        }}
                    >
                        Cancel
                    </button>
                    <Link to="/">
                        <button className="text-lg bg-[#fbfbfa] text-[#0F1035] w-32 h-8 rounded-lg border-2 border-[#0F1035]">
                            Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Verification;
