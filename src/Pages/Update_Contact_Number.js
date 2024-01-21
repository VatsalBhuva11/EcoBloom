import React from "react";

const Update_Contact_Number = ({ visible, onClose }) => {
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
                    >
                        Enter New Contact Number<sup> *</sup>
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="••••••••"
                        class=" bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-700 placeholder-opacity-70"
                        required=""
                    />
                </div>
                <div>
                    <label
                        for="password"
                        class="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Confirm New Contact No.<sup> *</sup>
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        class=" bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focyus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-700 placeholder-opacity-70"
                        required
                    />
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
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Update_Contact_Number;
