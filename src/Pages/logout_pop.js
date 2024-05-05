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
        <div className="bg-[#E1E1E0] p-2 rounded w-92 flex flex-col justify-center ">
          <div>
            <img src={logout_logo} alt="" />
          </div>
          <div className="text-3xl font-bold text-[#277868] flex justify-center">
            Comeback Soon!
          </div>
          <div className="flex justify-center">Are You Sure You</div>
          <div className="flex justify-center">to Logout?</div>
          <div className="flex justify-around mt-7 mb-5">
            <button
              className="text-lg bg-[#277868] text-[#E9E9E9] w-32 h-8 rounded-lg"
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
              className="text-lg bg-[#277868] text-[#E9E9E9] w-32 h-8 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
};

export default Logout;
