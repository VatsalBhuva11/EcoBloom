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
            <div className="bg-[#CDE1C9] p-7 rounded w-96 flex flex-col justify-center mt-7 gap-3">
                <div>
                    <label
                        for="password"
                        class="block mb-2 text-sm font-medium text-gray-900"
                    ></label>
                    <input
                        type="email"
                        placeholder="Enter Registered E-mail"
                        class=" bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-700 placeholder-opacity-70"
                        required=""
                    />
                    <p className="text-[12px] mt-1 ml-2">
                        Verification mail will be send to Entered Email Account
                    </p>
                </div>
                <div className="flex justify-around mt-7 mb-5">
                    <button
                        className="text-lg bg-[#EEF0E5] text-[#0F1035] w-32 h-8 rounded-lg border-2 border-[#0F1035]"
                        onClick={() => {
                            document.getElementById("container").click();
                        }}
                    >
                        Cancel
                    </button>
                    <button className="text-lg bg-[#0F1035] text-[#EEF0E5] w-32 h-8 rounded-lg">
                        Verify
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Verify_Email;
