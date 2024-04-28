import React from "react";
import logout_logo from "../assets/images/logout_image.png";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.js";

const Logout = ({ visible, onClose }) => {
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
            <div className="bg-[#CDE1C9] p-2 rounded w-92 flex flex-col justify-center ">
                <div>
                    <img src={logout_logo} alt="" />
                </div>
                <div className="text-3xl font-bold text-[#1C1C1C] flex justify-center">
                    Comeback Soon!
                </div>
                <div className="flex justify-center">Are You Sure You</div>
                <div className="flex justify-center">to Logout?</div>
                <div className="flex justify-around mt-7 mb-5">
                    <button
                        className="text-lg bg-[#fbfbfa] text-[#0F1035] w-32 h-8 rounded-lg border-2 border-[#0F1035]"
                        onClick={() => {
                            document.querySelector("#container").click();
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            signOut(auth);
                            localStorage.removeItem("profile");
                            document.querySelector("#container").click();
                        }}
                        className="text-lg bg-[#0F1035] text-[#fbfbfa] w-32 h-8 rounded-lg"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Logout;
