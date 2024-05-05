import React from "react";

const Verify_Email = ({ visible, onClose }) => {
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
        <div className="bg-[#E1E1E0] p-7 rounded w-96 flex flex-col justify-center mt-7 gap-3">
          <div>
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-[#4A4A4A]"
            ></label>
            <input
              type="email"
              placeholder="Enter Registered E-mail"
              className=" bg-transparent border border-[#277868] text-[#4A4A4A] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder:text-[#4A4A4A] placeholder-opacity-70"
              required=""
            />
            <p className="text-[12px] mt-1 ml-2">
              Verification mail will be send to Entered Email Account
            </p>
          </div>
          <div className="flex justify-around mt-7 mb-5">
            <button
              className="text-lg bg-[#277868] text-[#E9E9E9] w-32 h-8 rounded-lg "
              onClick={() => {
                document.getElementById("container").click();
              }}
            >
              Cancel
            </button>
            <button className="text-lg bg-[#277868] text-[#E9E9E9] w-32 h-8 rounded-lg">
              Verify
            </button>
          </div>
        </div>
      </div>
    );
};

export default Verify_Email;
