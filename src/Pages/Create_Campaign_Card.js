import React from "react";
import tick from "../assets/images/tick.png";
import { Link } from "react-router-dom";

const Create_Campaign_Card = ({ visible, onClose }) => {
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
            <div className="bg-[#CDE1C9] p-2 rounded w-92 flex flex-col justify-center px-20">
                <div>
                    <img src={tick} alt="" />
                </div>
                <div className="text-3xl font-bold text-[#1C1C1C] flex justify-center">
                    Great!
                </div>
                <div className="flex justify-center">Campaign Created</div>
                <div className="flex justify-center">Successfully</div>
                <div className="flex justify-around mt-7 mb-5">
                    <Link to="/org/dashboard">
                        <button className="text-lg bg-[#0F1035] text-[#EEF0E5] w-40 h-8 rounded-lg">
                            Go Back
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Create_Campaign_Card;
