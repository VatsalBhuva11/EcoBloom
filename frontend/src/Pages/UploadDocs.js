import React, { useState, useEffect } from "react";

const UploadDocs = ({ nextStep, prevStep, handleChange, values }) => {
    const { stepCount } = values;
    const [selectedFiles, setSelectedFiles] = useState({
        document: null,
        logo: null,
        banner: null,
    });
    const [buttonClicked, setButtonClicked] = useState(null);
    const [status, setStatus] = useState(null);

    const Previous = (e) => {
        e.preventDefault();
        prevStep();
    };

    const Continue = (e) => {
        console.log(e);
        e.preventDefault();
        setButtonClicked(true);
        setStatus(null);
        console.log(selectedFiles);
        if (!selectedFiles || !selectedFiles.document) {
            setButtonClicked(false);
            setStatus("Document should be mandatorily uploaded.");
            return;
        }
        let formData = new FormData(document.getElementById("orgSignUpThree"));
        formData.append("email", values.email);
        console.log("OK");

        fetch(
            `${process.env.REACT_APP_DEPLOYED_API_URL}/auth/org/register/stepThree`,
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
                    console.log("Success:", data);
                    nextStep();
                    setButtonClicked(false);
                    setSelectedFiles(null);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                console.log("errormessage: ", error.message);
                setStatus("Error occurred while uploading files.");
                setButtonClicked(false);
                setSelectedFiles(null);
            });
    };

    return (
        <div className="flex flex-col justify-center items-center  w-screen h-screen gap-8">
            <div className="text-center">
                <h1 className="text-white text-3xl font-extrabold">
                    Just some documents!{" "}
                </h1>
                <h2 className="mt-0 pt-0 text-white text-xl">
                    {"(Logo and Banner are optional)"}
                </h2>
            </div>
            <form
                class=" w-100 bg-[#9db39b] gap-4 flex flex-col  p-12 rounded-lg"
                id="orgSignUpThree"
            >
                <p className="font-bold pb-4 text-center">
                    {"File sizes should be less than 100kb"}
                </p>
                <div className=" flex flex-col b justify-center items-start">
                    <label
                        class="block mb-2 text-sm font-medium text-gray-700 "
                        for="document"
                    >
                        <span className="font-semibold">
                            Document to verify *
                        </span>{" "}
                        <br />
                        <span className="font-light">
                            {
                                "(eg: Certificate of Incorporation, Tax Identification Number, etc)"
                            }
                        </span>
                    </label>
                    <input
                        class="signupFile block w-full text-lg text-gray-900 rounded-lg cursor-pointer bg-gray-50  focus:outline-none "
                        id="document"
                        name="document"
                        accept="image/*, application/pdf"
                        type="file"
                        onChange={(e) => {
                            console.log(selectedFiles);
                            setSelectedFiles({
                                ...selectedFiles,
                                document: e.target.files[0],
                            });
                        }}
                        required
                    />
                </div>
                <div className=" flex flex-col justify-center items-start">
                    <label
                        class="block mb-2 text-sm font-medium text-gray-700"
                        for="logo"
                    >
                        <span className="font-semibold">Company's Logo</span>{" "}
                        <br />
                    </label>
                    <input
                        class="signupFile block w-full text-lg text-gray-900  rounded-lg cursor-pointer bg-gray-50  focus:outline-none "
                        id="logo"
                        name="optionalLogo"
                        accept="image/jpeg, image/jpg, image/png"
                        type="file"
                        onChange={(e) => {
                            console.log(selectedFiles);

                            setSelectedFiles({
                                ...selectedFiles,
                                logo: e.target.files[0],
                            });
                        }}
                    />
                </div>
                <div className=" flex flex-col justify-center items-start">
                    <label
                        class="block mb-2 text-sm font-medium text-gray-700 "
                        for="document"
                    >
                        <span className="font-semibold">Company Banner</span>{" "}
                        <br />
                    </label>
                    <input
                        class="signupFile block w-full text-lg text-gray-900  rounded-lg cursor-pointer bg-gray-50 focus:outline-none "
                        id="banner"
                        name="optionalBanner"
                        accept="image/*, application/pdf"
                        type="file"
                        onChange={(e) => {
                            console.log(selectedFiles);

                            setSelectedFiles({
                                ...selectedFiles,
                                banner: e.target.files[0],
                            });
                        }}
                    />
                </div>
                {status !== null && (
                    <div className="text-center font-light pb-2 text-red-500">
                        {status}
                    </div>
                )}
                <div className="flex justify-center items-center pt-2 gap-4">
                    <div className="action-buttons w-1/2">
                        <button
                            className="flex justify-center items-center w-full bg-[#277868] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:scale-105 duration-300"
                            id="next"
                            disabled={stepCount === 4}
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
    );
};

export default UploadDocs;
