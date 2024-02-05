import React from "react";
import tick from "../assets/images/tick.png";

const Community_Joined_Card = ({ visible, onClose }) => {
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
            <div className="bg-[#CDE1C9] p-2 rounded w-92 flex flex-col justify-center px-6">
                <div className="flex justify-center items-center">
                    <img src={tick} alt="" />
                </div>
                <div className="text-3xl font-bold text-[#1C1C1C] flex justify-center">
                    Great!
                </div>
                <div className="flex justify-center">Community Joined</div>
                <div className="flex justify-center">Successfully</div>
                <div className="flex justify-around mt-7 mb-5 gap-10">
                    <button
                        onClick={() => {
                            onClose();
                        }}
                        className="text-lg bg-[#DFE4C5] text-[#0F1035] w-40 h-8 border border-[#0F1035] rounded-lg"
                    >
                        Cancel
                    </button>
                    <button className="text-lg bg-[#0F1035] text-[#EEF0E5] w-40 h-8 rounded-lg">
                        Start Exploring
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Community_Joined_Card;
