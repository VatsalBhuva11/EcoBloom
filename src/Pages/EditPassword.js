import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

const EditPassword = ({ visible, onClose }) => {
    const handleOnClose = (e) => {
        if (e.target.id === "container") onClose();
    };

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [clicked, setClicked] = useState(null);

    const handleAccountLinking = async () => {
        //check how to link email/pass to google
        //reset password if already linked.
        setClicked(true);
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            document.getElementById("container").click();
            setClicked(false);
            return;
        } else {
            const user = auth.currentUser;
            const token = await user.getIdToken();
            fetch(`${process.env.REACT_APP_LOCAL_API_URL}/user/linkPassword`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    password: password,
                    uid: user.uid,
                }),
            })
                .then((res) => {
                    if (res.status === 200) {
                        alert(
                            "Successfully changed password. Please login again."
                        );
                        auth.signOut();
                        setClicked(false);
                    } else {
                        alert("Error changing password");
                        document.getElementById("container").click();
                        setClicked(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    alert("Error changing password");
                    document.getElementById("container").click();
                    setClicked(false);
                });
        }
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
                        Old Password (leave blank if no password set)
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="••••••••"
                        class=" bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-700 placeholder-opacity-70"
                    />
                </div>
                <div>
                    <label
                        for="password"
                        class="block mb-2 text-sm font-medium text-gray-900"
                    >
                        New Password<sup> *</sup>
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        class=" bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focyus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-700 placeholder-opacity-70"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        required
                    />
                </div>
                <div>
                    <label
                        for="password"
                        class="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Confirm Password<sup> *</sup>
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="••••••••"
                        class=" bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-700 placeholder-opacity-70"
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                        required=""
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
                    {!clicked ? (
                        <button
                            className="text-lg bg-[#0F1035] text-[#EEF0E5] w-32 h-8 rounded-lg"
                            onClick={handleAccountLinking}
                        >
                            Change
                        </button>
                    ) : (
                        <button
                            className="text-lg bg-[#131544] text-[#EEF0E5] w-32 h-8 rounded-lg"
                            disabled
                        >
                            Changing Password...
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditPassword;
