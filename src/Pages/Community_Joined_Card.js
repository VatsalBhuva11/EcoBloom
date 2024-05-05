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
        <div className="bg-[#E1E1E0] p-2 rounded w-92 flex flex-col justify-center px-6">
          <div className="flex justify-center items-center">
            <img src={tick} alt="" />
          </div>
          <div className="text-3xl font-bold text-[#277868] flex justify-center">
            Great!
          </div>
          <div className="flex justify-center">Community Joined</div>
          <div className="flex justify-center">Successfully</div>
          <div className="flex justify-around mt-7 mb-5 gap-10">
            <button
              onClick={() => {
                onClose();
              }}
              className="text-lg bg-[#277868] text-[#E9E9E9] w-40 h-8 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                window.location.href = "/user/join";
              }}
              className="text-lg bg-[#277868] text-[#E9E9E9] w-40 h-8 rounded-lg"
            >
              Start Exploring
            </button>
          </div>
        </div>
      </div>
    );
};

export default Community_Joined_Card;
