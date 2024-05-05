import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage } from "../firebase.js";
import { getDownloadURL, ref } from "firebase/storage";
import { useContext, useState } from "react";
import { ProfileContext } from "../Components/ProfileContextProvider.js";
import { jwtDecode } from "jwt-decode";

const Change_profile = ({ visible, onClose }) => {
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
                const idTokenResult = jwtDecode(idToken);
                const fileInput = new FormData(
                    document.getElementById("emailSignUp")
                );
                fetch(
                    `${process.env.REACT_APP_DEPLOYED_API_URL}/user/${idTokenResult.user_id}/profile?type=photo`,
                    {
                        method: "PATCH",
                        body: fileInput,
                        headers: {
                            authorization: `Bearer ${idToken}`,
                        },
                    }
                )
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("DATA: ", data);
                        if (data.status === "OK") {
                            const storageRef = ref(
                                storage,
                                data.data.photoPathFirestore
                            );
                            getDownloadURL(storageRef)
                                .then(function (url) {
                                    console.log("URL in getDownload: ", url);
                                    setProfile({
                                        ...profile,
                                        url,
                                    });

                                    localStorage.setItem(
                                        "profile",
                                        JSON.stringify({
                                            ...JSON.parse(
                                                localStorage.getItem("profile")
                                            ),
                                            profileUrl: url,
                                        })
                                    );
                                    console.log(
                                        localStorage.getItem("profile")
                                    );
                                    setClicked(false);
                                    document
                                        .getElementById("container")
                                        .click();
                                })
                                .catch(function (error) {
                                    setClicked(false);
                                    document
                                        .getElementById("container")
                                        .click();
                                    console.error(error);
                                });
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
        <div className="bg-[#E1E1E0] p-7 rounded w-96 flex flex-col justify-center mt-7 gap-3">
          <form className="space-y-2 md:space-y-4" action="#" id="emailSignUp">
            <label
              className="block mb-2 text-sm font-medium text-[#277868]"
              for="file_input"
            >
              Upload Photo<sup>*</sup>
            </label>
            <input
              className="block w-full text-sm  file:bg-[#277868]  file:text-[#E9E9E9] file:p-2 file:rounded-lg file:font-bold file:hover:scale-105 file:duration-300 rounded-lg cursor-pointer focus:outline-none bg-transparent text-[#277868]"
              aria-describedby="file_input_help"
              id="profile"
              name="profile"
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
              className="text-lg text-[#E9E9E9] bg-[#277868] w-32 h-8 rounded-lg "
            >
              Cancel
            </button>
            {!clicked ? (
              <button
                onClick={updateLogo}
                className="text-lg bg-[#277868] text-[#E9E9E9] w-32 h-8 rounded-lg"
              >
                Update
              </button>
            ) : (
              <button
                disabled
                className="text-lg bg-[#277868] text-[#E9E9E9] w-32 h-8 rounded-lg"
              >
                Updating...
              </button>
            )}
          </div>
        </div>
      </div>
    );
};

export default Change_profile;
