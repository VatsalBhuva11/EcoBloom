import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { auth } from "../firebase.js";
import { jwtDecode } from "jwt-decode";

const Update_Contact_Number = ({ visible, onClose }) => {
    const handleOnClose = (e) => {
        if (e.target.id === "container") onClose();
    };
    const [clicked, setClicked] = useState(false);
    const [phone, setPhone] = useState();
    const [confirmPhone, setConfirmPhone] = useState();

    function handlePhoneUpdate() {
        setClicked(true);
        if (confirmPhone !== phone) {
            alert("Phone numbers do not match");
            setClicked(false);
            return;
        }
        if (auth.currentUser) {
            const formData = new FormData();
            formData.append("phone", phone);
            auth.currentUser.getIdToken().then(async (idToken) => {
                const idTokenResult = jwtDecode(idToken);

                const response = await fetch(
                    `${process.env.REACT_APP_DEPLOYED_API_URL}/user/${idTokenResult.user_id}/profile?type=phone`,
                    {
                        method: "PATCH",
                        body: formData,
                        headers: {
                            authorization: `Bearer ${idToken}`,
                        },
                    }
                );
                if (!response.ok) {
                    setClicked(false);
                    alert("Error occurred while updating phone number");
                    return;
                }
                const data = await response.json();
                document.getElementById("container").click();
                if (data.status === "OK") {
                    setClicked(false);
                    alert("SUCCESS!");
                } else {
                    setClicked(false);
                    alert(data.message);
                }
            });
        } else {
            document.getElementById("container").click();
            setClicked(false);
            alert("User not logged in");
        }
    }

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
              for="phone"
              className="block mb-2 text-sm font-medium text-[#4A4A4A]"
            >
              Enter New Contact Number<sup> *</sup>
            </label>
            <input
              type="number"
              name="phone"
              id="phone"
              placeholder="0000000000"
              className=" bg-transparent border border-[#277868] text-[#4A4A4A] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder:text-[#4A4A4A] placeholder-opacity-70"
              required=""
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
          <div>
            <label
              for="confirmPhone"
              className="block mb-2 text-sm font-medium text-[#4A4A4A]"
            >
              Confirm New Contact No.<sup> *</sup>
            </label>
            <input
              type="number"
              name="confirmPhone"
              id="confirmPhone"
              placeholder="0000000000"
              className=" bg-transparent border border-[#277868] text-[#4A4A4A] sm:text-sm rounded-lg focyus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder:text-[#4A4A4A] placeholder-opacity-70"
              required
              onChange={(e) => {
                setConfirmPhone(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-around mt-7 mb-5">
            <button
              className="text-lg bg-[#277868] text-[#E9E9E9] w-32 h-8 rounded-lg"
              onClick={() => {
                document.getElementById("container").click();
              }}
            >
              Cancel
            </button>
            {!clicked ? (
              <button
                className="text-lg bg-[#277868] text-[#E9E9E9] w-32 h-8 rounded-lg"
                onClick={handlePhoneUpdate}
              >
                Update
              </button>
            ) : (
              <button
                className="text-lg bg-[#277868] text-[#E9E9E9] w-32 h-8 rounded-lg"
                disabled
              >
                Updating...
              </button>
            )}
          </div>
        </div>
      </div>
    );
};

export default Update_Contact_Number;
