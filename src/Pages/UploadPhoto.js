import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const UploadPhoto = ({ nextStep, prevStep, handleChange, values }) => {
    const [preview, setPreview] = useState(null);
    const { stepCount } = values;
    const [selectedFile, setSelectedFile] = useState(null);
    const [buttonClicked, setButtonClicked] = useState(null);
    const [status, setStatus] = useState(null);

    const Previous = (e) => {
        e.preventDefault();
        prevStep();
    };
    useEffect(() => {
        // create the preview
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(values.photo);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const Continue = (e) => {
        console.log(e);
        e.preventDefault();
        setButtonClicked(true);
        setStatus(null);

        if (!selectedFile) {
            nextStep();
            setButtonClicked(false);
            return;
        }
        // console.log("BEFORE VALIDATION");
        // if (!validateForm()) {
        //     setSignUpClicked(false);
        //     return;
        // }
        let formData = new FormData(document.getElementById("userSignUpTwo"));
        formData.append("email", values.email);
        console.log("OK");

        fetch(
            `${process.env.REACT_APP_DEPLOYED_API_URL}/auth/user/register/stepTwo`,
            {
                method: "POST",
                body: formData,
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "error") {
                    setButtonClicked(false);
                    console.log(data);
                    setStatus(data.error);
                } else {
                    console.log(data);
                    setButtonClicked(false);
                    nextStep();
                    console.log("Success:", data);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                console.log("errormessage: ", error.message);
                setStatus("Error occurred while uploading file.");
                setButtonClicked(false);
                setSelectedFile(null);
            });
    };

    return (
        <div className="  flex flex-col justify-center items-center w-screen h-screen gap-12">
            <div className="p-12 pb-20 rounded-lg gap-4 flex flex-col justify-center items-center bg-[#9db39b]">
                <div className="text-left w-full relative bottom-4 right-8">
                    <Link to="/">
                        {" "}
                        <FaArrowLeft className=" hover:scale-105 duration-150 text-xl cursor-pointer" />{" "}
                    </Link>
                </div>

                <h1 className="text-3xl font-extrabold">
                    Upload your photo!{" "}
                    <span className=" font-bold">(Optional)</span>
                </h1>
                <p className="font-light relative bottom-4">
                    {"(Max size <= 100kb)"}
                </p>
                <form class=" w-80 h-80" id="userSignUpTwo">
                    <label
                        for="dropzone-file"
                        class="mb-4 flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                    >
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                                class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                            </svg>
                            {selectedFile === null ? (
                                <div>
                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span class="font-semibold">
                                            Click to upload
                                        </span>{" "}
                                        or drag and drop
                                    </p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">
                                        SVG, PNG, JPG (MAX SIZE: 100kb)
                                    </p>
                                </div>
                            ) : (
                                <div className=" text-gray-400 text-center gap-4 font-light flex flex-col justify-center items-center">
                                    <img
                                        src={preview}
                                        className="h-20 w-20"
                                    ></img>
                                    <p>{selectedFile.name}</p>
                                </div>
                            )}
                        </div>
                        <input
                            onChange={(e) => {
                                handleChange(e, e.target.files[0]);
                                if (e.target.files.length > 0) {
                                    setSelectedFile(e.target.files[0]);
                                }
                            }}
                            id="dropzone-file"
                            type="file"
                            class="hidden"
                            name="photo"
                            accept="image/*"
                        />
                    </label>
                    {status !== null && (
                        <div className="text-center font-light pb-2 text-red-500">
                            {status}
                        </div>
                    )}
                    <div className="flex justify-center items-center mb-4 gap-4">
                        <div className="action-buttons w-1/2 mb-4 ">
                            {/* <button
                            id="prev"
                            disabled={stepCount === 1}
                            onClick={() => {
                                prevStep();
                            }}
                        >
                            Prev
                        </button> */}
                            <button
                                className="flex justify-center items-center w-full bg-[#277868] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:scale-105 duration-300"
                                id="next"
                                disabled={stepCount === 3}
                                onClick={(e) => {
                                    Continue(e);
                                }}
                            >
                                {!buttonClicked ? (
                                    "Next"
                                ) : (
                                    <div role="status">
                                        <svg
                                            aria-hidden="true"
                                            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                            viewBox="0 0 100 101"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentFill"
                                            />
                                        </svg>
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadPhoto;
