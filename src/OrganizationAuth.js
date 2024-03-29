import {
    signInWithPopup,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    linkWithPopup,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./index.js";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

//figure out sign out, and how to manage auth state.
//organization registration

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("https://www.googleapis.com/auth/contacts.readonly");
export default function OrganizationAuth() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    const [user, loading, error] = useAuthState(auth);

    function linkWithGoogle(event) {
        event.preventDefault();
        linkWithPopup(auth.currentUser, googleProvider)
            .then((result) => {
                // Accounts successfully linked.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const user = result.user;
                console.log("User: ", user);
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // ...
                console.log(error);
            });
    }

    function googleSignIn(event) {
        event.preventDefault();

        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                console.log("Signed in!");
                console.log("User: ", user);
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                // ...
                console.log(error);
            });
    }

    function emailSignIn(event) {
        event.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log("Initially not signed");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error);
            });
    }

    function emailSignUp(event) {
        event.preventDefault();

        // let files = document.querySelector('input[type="file"]').files;
        let formData = new FormData(document.getElementById("emailSignUp"));

        fetch(`${process.env.REACT_APP_DEPLOYED_API_URL}/auth/org/register`, {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "error") {
                    throw new Error("Invalid form input. Please check again,");
                } else {
                    console.log("Org in DB: ");
                    createUserWithEmailAndPassword(auth, email, password)
                        .then((orgCredential) => {
                            // Signed Up
                            console.log("Org in Firebase");
                            const user = orgCredential.user;
                            console.log(user);
                            // ...
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            // ..
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
            <div>
                <button className="btn btn-lime" onClick={linkWithGoogle}>
                    Link with Google
                </button>

                <button className="btn btn-lime" onClick={googleSignIn}>
                    Sign In With Google
                </button>
                <h1 className="text-3xl font-bold underline">
                    Sign In With Email
                </h1>
                <form id="emailSignIn" action="emailSignIn">
                    <input
                        className="inp"
                        type="text"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="inp"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <button
                        className="btn btn-lime"
                        type="submit"
                        onClick={emailSignIn}
                    >
                        Sign In
                    </button>
                </form>
                <br />
                <h4 className="text-3xl font-bold underline">Sign Up</h4>
                <form
                    id="emailSignUp"
                    name="emailSignUp"
                    encType="multipart/form-data"
                >
                    <input
                        className="inp"
                        type="text"
                        placeholder="Name"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="inp"
                        type="text"
                        placeholder="Email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="inp"
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />

                    <input type="file" id="logo" name="optionalLogo" />
                    <input type="file" id="banner" name="optionalBanner" />
                    <input type="file" id="document" name="document" required />
                    <button
                        className="btn btn-lime"
                        type="submit"
                        onClick={emailSignUp}
                    >
                        Sign Up
                    </button>
                </form>
                <button
                    className="btn btn-lime"
                    onClick={() => {
                        fetch(`${process.env.REACT_APP_DEPLOYED_API_URL}`)
                            .then((response) => response.json())
                            .then((data) => {
                                console.log("Success:", data);
                            })
                            .catch((error) => {
                                console.error("Error:", error);
                            });
                    }}
                >
                    Test API
                </button>
            </div>
            <button
                className="btn btn-lime"
                onClick={() => {
                    signOut(auth);
                }}
            >
                Sign out!
            </button>
        </>
    );
}
