import React, { useState , useEffect } from "react";
import Webcam from "react-webcam";
import { auth, storage } from "../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { jwtDecode } from "jwt-decode";
import { HashLoader } from "react-spinners";

export default function Video({ userId, campaignId }) {
    console.log(userId, " from Video");
    const [status, setStatus] = useState(null);
    const [clicked, setClicked] = useState(null);
    const [loader, setLoader] = useState(true);
    const [user, loading, error] = useAuthState(auth);

    useEffect(()=>{

        if (auth.currentUser) {
            auth.currentUser.getIdToken().then((idToken) => {
                const idTokenResult = jwtDecode(idToken);
                console.log(idTokenResult);
                if (idTokenResult.role === "user" || !idTokenResult.role){
                    window.location.replace( '/user/dashboard');
                    // <Navigate to = 'org/dashboard'  replace  = {true}/>
                }else{
                    setLoader(false)
                }
            });
            
        }
       

    },[loading])

    function DataURIToBlob(dataURI) {
        const splitDataURI = dataURI.split(",");
        const byteString =
            splitDataURI[0].indexOf("base64") >= 0
                ? atob(splitDataURI[1])
                : decodeURI(splitDataURI[1]);
        const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

        const ia = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++)
            ia[i] = byteString.charCodeAt(i);

        return new Blob([ia], { type: mimeString });
    }

    function handleUserVerify(getScreenshot) {
        setClicked(true);
        const imageSrc = getScreenshot();
        const file = DataURIToBlob(imageSrc);
        console.log("FILE: ", file);
        const formData = new FormData();
        formData.append("upload", file, "image.jpeg");
        if (auth.currentUser) {
            auth.currentUser.getIdTokenResult().then((idTokenResult) => {
                fetch(
                    `${process.env.REACT_APP_DEPLOYED_API_URL}/campaign/${campaignId}/verifyUser?userId=${userId}`,
                    {
                        method: "POST",
                        body: formData,
                    }
                )
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("DATA: ", data);
                        if (data.status === "OK") {
                            if (data.data.confidence >= 85) {
                                let verifyButton = document.getElementById(
                                    "verify" + userId
                                );
                                verifyButton.textContent = "Verified!";
                                verifyButton.disabled = "true";
                                verifyButton.classList.replace(
                                    "bg-[#353657]",
                                    "bg-lime-600"
                                );
                                let verifiedUsersCount =
                                    document.getElementById("verifiedUsers");
                                let remainingUsersCount =
                                    document.getElementById("remainingUsers");
                                verifiedUsersCount.textContent = ` ${
                                    parseInt(verifiedUsersCount.textContent) + 1
                                }`;
                                remainingUsersCount.textContent = ` ${
                                    parseInt(remainingUsersCount.textContent) -
                                    1
                                }`;
                                setStatus("success");
                                setClicked(false);
                            } else {
                                setStatus("failure");
                                setClicked(false);
                            }
                        } else {
                            setStatus("failure");
                            setClicked(false);
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        setClicked(false);
                    });
            });
        }
    }

    if (loading || loader) {
        return (
            <div className="h-screen flex items-center justify-center">
                <HashLoader color="#36d7b7" size={100} />
            </div>
        );
    }

    const videoConstraints = {
        width: 540,
        height: 360,
        facingMode: "user",
    };

    return (
        <div className="">
            <Webcam
                mirrored="true"
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
            >
                {({ getScreenshot }) => (
                    <div className="flex justify-around w-full mt-4">
                        <button
                            className="text-lg bg-[#EEF0E5] text-[#0F1035] w-32 h-8 rounded-lg border-2 border-[#0F1035]"
                            onClick={() => {
                                setStatus("");
                                setClicked(null);
                                document.querySelector("#container").click();
                            }}
                        >
                            Cancel
                        </button>
                        {clicked && status === null ? (
                            <button
                                className="text-lg bg-[#1d2068] text-[#EEF0E5] w-32 h-8 rounded-lg"
                                disabled
                            >
                                Verifying...
                            </button>
                        ) : !clicked && status === "success" ? (
                            <button
                                className="text-lg bg-[#2b8b23] text-[#EEF0E5] w-32 h-8 rounded-lg"
                                disabled
                            >
                                Verified!
                            </button>
                        ) : !clicked && status === "failure" ? (
                            <button
                                className="text-lg bg-[#b83148] text-[#EEF0E5] w-32 h-8 rounded-lg"
                                disabled
                            >
                                Error
                            </button>
                        ) : (
                            <button
                                className="text-lg bg-[#0F1035] text-[#EEF0E5] w-32 h-8 rounded-lg"
                                onClick={() => {
                                    handleUserVerify(getScreenshot);
                                }}
                            >
                                Verify
                            </button>
                        )}
                    </div>
                )}
            </Webcam>
        </div>
    );
}
