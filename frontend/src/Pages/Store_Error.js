import React from "react";
import moye_moye from "../assets/images/moye_moye.png";
import { Link } from "react-router-dom";

const Store_Error = ({ visible, onClose }) => {
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
        <div className="bg-[#E1E1E0] p-2 rounded w-92 flex flex-col justify-center px-10">
          <div className="flex justify-center">
            <img src={moye_moye} alt="" />
          </div>
          <div className="text-3xl font-bold text-[#277868] flex justify-center">
            OOPS!
          </div>
          <div className="flex justify-center">Participate More To earn</div>
          <div className="flex justify-center">Your Desired Swag</div>
          <div className="flex justify-around mt-7 mb-5 gap-10">
            <button
              onClick={() => {
                onClose();
              }}
              className="text-md bg-[#277868] text-[#E9E9E9] w-40 h-8 rounded-lg"
            >
              Cancel
            </button>
            <Link to="/user/join">
              <button className="text-md bg-[#277868] text-[#E9E9E9] w-40 h-8 rounded-lg">
                Start Exploring
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
};

export default Store_Error;
