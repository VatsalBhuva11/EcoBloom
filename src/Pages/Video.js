import React from "react";
import Webcam from "react-webcam";

export default function Video() {
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
        const imageSrc = getScreenshot();
        const file = DataURIToBlob(imageSrc);
        const formData = new FormData();
        formData.append("upload", file, "image.jpeg");
        fetch(
            `${process.env.REACT_APP_LOCAL_API_URL}/campaign/verifyUser?userId=65b0294eeb538d01520027d9`,
            {
                method: "POST",
                body: formData,
            }
        )
            .then((response) => response.json())
            .then((data) => {
                console.log("SUCCESS!");
                console.log(data);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    const videoConstraints = {
        width: 540,
        height: 360,
        facingMode: "user",
    };

    return (
        <div>
            <Webcam
                mirrored="true"
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
            >
                {({ getScreenshot }) => (
                    <button
                        onClick={() => {
                            handleUserVerify(getScreenshot);
                        }}
                    >
                        Capture photo
                    </button>
                )}
            </Webcam>
        </div>
    );
}
