import {
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    EmailAuthProvider,
    linkWithPopup,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";

let googleProvider = new GoogleAuthProvider();
googleProvider.addScope("https://www.googleapis.com/auth/contacts.readonly");

let emailProvider = new EmailAuthProvider();

export default function SignIn() {
    const auth = getAuth();
    const [email, setEmail] = useState("");
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

    function onSubmit(event) {
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
        console.log(email, password);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed Up
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
    }

    return (
        <>
            <head>
                <title>SignIn · EcoBloom</title>
            </head>
            <body>
                <button onClick={linkWithGoogle}>Link with Google</button>
                <button onClick={onSubmit}>Sign In With Google</button>
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
            </body>
        </>
    );
}

SignIn.front = true;
