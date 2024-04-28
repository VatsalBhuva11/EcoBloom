import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage } from "../firebase.js";
import { getDownloadURL, ref } from "firebase/storage";
import { useContext, useState } from "react";
import { ProfileContext } from "../Components/ProfileContextProvider.js";

const Change_profile_org = ({ visible, onClose }) => {
    const handleOnClose = (e) => {
        if (e.target.id === "container") onClose();
    };

    const [user, loading, error] = useAuthState(auth);
    const [profile, setProfile] = useContext(ProfileContext);
    const [clicked, setClicked] = useState(false);

    if (!visible) return null;

    function updateLogo() {
        setClicked(true);
        if (auth.currentUser) {
            auth.currentUser.getIdToken().then(async (idToken) => {
                const fileInput = new FormData(
                    document.getElementById("emailSignUp")
                );
                fetch(`${process.env.REACT_APP_DEPLOYED_API_URL}/org/`, {
                    method: "PATCH",
                    body: fileInput,
                    headers: {
                        authorization: `Bearer ${idToken}`,
                    },
                })
                    .then((response) => response.json())
                    .then(async (data) => {
                        console.log("DATA: ", data);
                        if (data.status === "OK") {
                            const storageRef1 = ref(storage, data.data.logo);
                            const storageRef2 = ref(storage, data.data.banner);
                            const urls = await Promise.all([
                                getDownloadURL(storageRef1),
                                getDownloadURL(storageRef2),
                            ]);
                            console.log("urls: ", urls);
                            setProfile({
                                ...profile,
                                logo: urls[0],
                                banner: urls[1],
                            });

                            localStorage.setItem(
                                "profile",
                                JSON.stringify({
                                    ...JSON.parse(
                                        localStorage.getItem("profile")
                                    ),
                                    logo: urls[0],
                                    banner: urls[1],
                                })
                            );
                            setClicked(false);
                            document.getElementById("container").click();
                        } else {
                            setClicked(false);
                            document.getElementById("container").click();
                            alert(
                                "Error occurred while changing photo with status != 200"
                            );
                            alert(data.message);
                        }
                    })
                    .catch((err) => {
                        setClicked(false);
                        document.getElementById("container").click();
                        alert("Error occurred while changing photo");
                        console.log(err);
                    });
            });
        } else {
            setClicked(false);
            window.location.replace("/login");
        }
    }

    return (
        <div
            id="container"
            onClick={handleOnClose}
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
        >
            <div className="bg-[#CDE1C9] p-7 rounded w-96 flex flex-col justify-center mt-7 gap-3">
                <form
                    className="space-y-2 md:space-y-4"
                    action="#"
                    id="emailSignUp"
                >
                    <label
                        className="block mb-2 text-sm font-medium text-[#0f1035]"
                        for="file_input"
                    >
                        Upload Photo<sup>*</sup>
                    </label>
                    <input
                        className="block w-full text-sm  file:bg-[#0f1035]  file:text-white file:p-2 file:rounded-lg file:font-bold file:hover:scale-105 file:duration-300 rounded-lg cursor-pointer focus:outline-none bg-transparent text-[#0f1035]"
                        aria-describedby="file_input_help"
                        id="logo"
                        name="logo"
                        type="file"
                        accept="image/*"
                        required
                    />
                </form>
                <div className="flex justify-around mt-7 mb-5">
                    <button
                        onClick={() => {
                            document.getElementById("container").click();
                        }}
                        className="text-lg bg-[#fbfbfa] text-[#0F1035] w-32 h-8 rounded-lg border-2 border-[#0F1035]"
                    >
                        Cancel
                    </button>
                    {!clicked ? (
                        <button
                            onClick={updateLogo}
                            className="text-lg bg-[#0F1035] text-[#fbfbfa] w-32 h-8 rounded-lg"
                        >
                            Update
                        </button>
                    ) : (
                        <button
                            disabled
                            className="text-lg bg-[#0f1035cd] text-[#fbfbfa] w-32 h-8 rounded-lg"
                        >
                            Updating...
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Change_profile_org;
