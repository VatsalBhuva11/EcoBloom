import { auth } from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function OrgSignup() {
    function emailSignUp(event) {
        event.preventDefault();
        // let files = document.querySelector('input[type="file"]').files;
        let formData = new FormData(document.getElementById("emailSignUp"));
        formData.append("name", "testOrg");
        formData.append("email", "testOrg@gmail.com");
        formData.append("password", "testOrg");
        let email = "testOrg@gmail.com";
        let password = "testOrg";

        fetch(`${process.env.REACT_APP_LOCAL_API_URL}/auth/org/register`, {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "error") {
                    throw new Error("Invalid form input. Please check again.");
                } else {
                    createUserWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                            // Signed Up
                            console.log("Signed up org!", userCredential.user);
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            console.log(error);
                        });
                    console.log("Success:", data);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    return (
        <>
            <form class="space-y-2 md:space-y-4" action="#" id="emailSignUp">
                <div>
                    <label
                        class="block mb-2 text-sm font-medium text-[#0f1035]"
                        for="file_input"
                    >
                        Logo<sup>*</sup>
                    </label>
                    <input
                        class="block w-full text-sm  file:bg-[#0f1035]  file:text-white file:p-2 file:rounded-lg file:font-bold file:hover:scale-105 file:duration-300 rounded-lg cursor-pointer focus:outline-none bg-transparent text-[#0f1035]"
                        aria-describedby="file_input_help"
                        id="logo"
                        name="logo"
                        type="file"
                        accept="image/*"
                        required
                    />
                </div>
                <div>
                    <label
                        class="block mb-2 text-sm font-medium text-[#0f1035]"
                        for="file_input"
                    >
                        Document<sup>*</sup>
                    </label>
                    <input
                        class="block w-full text-sm  file:bg-[#0f1035]  file:text-white file:p-2 file:rounded-lg file:font-bold file:hover:scale-105 file:duration-300 rounded-lg cursor-pointer focus:outline-none bg-transparent text-[#0f1035]"
                        aria-describedby="file_input_help"
                        id="document"
                        name="document"
                        type="file"
                        accept="image/*"
                        required
                    />
                </div>
                <button
                    type="submit"
                    class="w-full bg-[#0F1035] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:scale-105 duration-300"
                    onClick={emailSignUp}
                >
                    Create Account
                </button>
            </form>
            <button
                onClick={() => {
                    console.log("Auth.currentUser: ", auth.currentUser);
                    auth.currentUser.getIdTokenResult().then((tokenResult) => {
                        console.log(tokenResult.claims);
                        // alert(tokenResult.claims);
                    });
                }}
            >
                Check claims
            </button>
        </>
    );
}
