import {
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    linkWithPopup,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";

let googleProvider = new GoogleAuthProvider();
googleProvider.addScope("https://www.googleapis.com/auth/contacts.readonly");

export default function SignIn() {
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    function linkWithGoogle(event) {
        event.preventDefault();
        const auth = getAuth();
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
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error);
            });
    }

    function emailSignUp(event) {
        event.preventDefault();
        fetch(`${process.env.REACT_APP_LOCAL_API_URL}/auth/user/register`, {
            method: "POST",
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("User in DB: ");
                console.log(data);
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed Up
                        console.log("User in Firebase");
                        const user = userCredential.user;
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
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    return (
        <>
            <div>
                <button onClick={linkWithGoogle}>Link with Google</button>
                <button onClick={googleSignIn}>Sign In With Google</button>
                <h4>Sign In With Email</h4>
                <form id="emailSignIn" action="emailSignIn">
                    <input
                        type="text"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <button type="submit" onClick={emailSignIn}>
                        Sign In
                    </button>
                </form>
                <br />
                <h4>Sign Up</h4>
                <form id="emailSignUp" action="emailSignUp">
                    <input
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <button type="submit" onClick={emailSignUp}>
                        Sign Up
                    </button>
                </form>
                <button
                    onClick={() => {
                        fetch(`${process.env.REACT_APP_LOCAL_API_URL}`)
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
        </>
    );
}
