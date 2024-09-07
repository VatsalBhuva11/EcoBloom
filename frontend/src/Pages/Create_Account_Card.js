import React from "react";
import tick from "../assets/images/tick.png";
import { Link } from "react-router-dom";

const Login_Card = ({ visible, onClose }) => {
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
      <div className="bg-[#E1E1E0] p-2 rounded w-92 flex flex-col justify-center px-20">
        <div>
          <img src={tick} alt="" />
        </div>
        <div className="text-3xl font-bold text-[#277868] flex justify-center">
          Great!
        </div>
        <div className="flex justify-center">Account Created</div>
        <div className="flex justify-center">Successfully</div>
        <div className="flex justify-around mt-7 mb-5">
          <Link to="/login">
            <button className="text-lg bg-[#277868] text-[#E9E9E9] w-40 h-8 rounded-lg">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login_Card;
