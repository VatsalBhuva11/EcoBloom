import React, { useEffect, useState } from "react";
import { auth } from "../firebase.js";

export default function AddDesc({ nextStep, prevStep, handleChange, values }) {
    const { email, password, name, confirmPassword, stepCount } = values;
    const formBasic = { email, password, name, confirmPassword };
    const [signUpClicked, setSignUpClicked] = useState(false);
    const [status, setStatus] = useState(null);
    const [desc, setDesc] = useState("");

    const Continue = (e) => {
        console.log(e);
        e.preventDefault();
        setSignUpClicked(true);
        setStatus(null);

        if (!desc || desc.length === 0) {
            nextStep();
            setSignUpClicked(false);
            return;
        }
        let formData = new FormData(document.getElementById("orgSignUpTwo"));
        formData.append("email", email);
        console.log("OK");
        fetch(
            `${process.env.REACT_APP_DEPLOYED_API_URL}/auth/org/register/stepTwo`,
            {
                method: "POST",
                body: formData,
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "error") {
                    setSignUpClicked(false);

                    auth.currentUser.delete();
                    console.log(data);
                    throw new Error("Invalid form input. Please check again,");
                } else {
                    console.log("User in DB: ");
                    console.log(data);
                    console.log("Success:", data);
                    setSignUpClicked(false);
                    nextStep();
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                console.log("errormessage: ", error.message);
                auth.currentUser.delete();
                setStatus("failure");
                setSignUpClicked(false);
            });
    };

    return (
        <div className="bg-[#9db39b] flex flex-col bottom-0 justify-center items-center w-[40%] min-h-fit py-4 shadow-md rounded-2xl mx-auto mb-8">
            <h1 className="text-xl font-extrabold">
                Describe your organization!
            </h1>

            <form
                className="step relative top-4 w-[75%] flex flex-col justify-center items-center"
                id="orgSignUpTwo"
            >
                {/* <p className="text-md text-gray-700 leading-tight text-center mt-8 mb-5">
                    Create your account
                </p> */}
                <div className="mb-6 w-[90%]">
                    <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                    >
                        Description
                    </label>
                    <textarea
                        placeholder="We are committed towards making this world a better place for everyone!"
                        type="text"
                        rows={4}
                        name="description"
                        id="description"
                        className="bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 placeholder-gray-700 placeholder-opacity-70"
                        // className="w-full focus:text-gray-800 px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200"
                        // oninput="this.className = 'w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200'"
                        onChange={(e) => {
                            setDesc(e.target.value);
                            handleChange(e);
                        }}
                        required
                    />
                </div>

                {status !== null && (
                    <div className="text-center font-light pb-2 text-red-500">
                        {status}
                    </div>
                )}
                <div className="flex justify-center items-center pb-12 gap-4">
                    <div className="action-buttons">
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
                            disabled={stepCount === 4}
                            onClick={(e) => {
                                Continue(e);
                                // nextStep();
                            }}
                        >
                            {!signUpClicked ? (
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
}
