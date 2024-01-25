import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.config.js";
import router from "./routes/index.routes.js";
import { onRequest } from "firebase-functions/v2/https";
import {
    beforeUserCreated,
    beforeUserSignedIn,
} from "firebase-functions/v2/identity";
import User from "./models/user.model.js";
import Organization from "./models/organization.model.js";
import { response_500 } from "./utils/responseCodes.js";
import { storage } from "./config/firebase.config.js";
import { ref, uploadBytesResumable } from "firebase/storage";
import fetch from "node-fetch";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
//https://ecobloom-rsxx5czyua-uc.a.run.app
app.get("/", (req, res) => {
    const message = "EcoBloom API at /";
    res.json(message);
});

//https://ecobloom-rsxx5czyua-uc.a.run.app/api
app.get("/api", (req, res) => {
    const message = "EcoBloom API at /api";
    res.json(message);
});

app.use("/api", router);

export const ecobloom = onRequest({ cors: true }, app);

//run even for google sign in
export const beforecreated = beforeUserCreated(async (event) => {
    try {
        const email = event.data.email;
        const checkUser = await User.findOne({ email: event.data.email });
        // done using google sign in
        if (event.additionalUserInfo.providerId === "google.com") {
            const checkOrg = await Organization.findOne({ email });
            //if user is already registered and signing in
            if (checkUser) {
                return {
                    displayName: checkUser.name,
                    customClaims: {
                        role: "user",
                        userId: checkUser._id,
                    },
                };
            } else if (checkOrg) {
                return {
                    displayName: checkUser.name,
                    customClaims: {
                        role: "org",
                        orgId: checkUser._id,
                    },
                };
            } else {
                //handle new user registering using sign in with google
                console.log("Coming in else");
                const name = event.data.displayName;
                const email = event.data.email;
                //fetch google account photo
                const photoURL = event.data.photoURL;

                const response = await fetch(photoURL);
                const buffer = await response.arrayBuffer();
                console.log("BUFFER: ", buffer);
                const storagePath = `/user/${email}/profile.jpeg`;
                const storageRef = ref(storage, storagePath);
                const metadata = {
                    contentType: "image/jpeg",
                };
                const snapshot = await uploadBytesResumable(
                    storageRef,
                    buffer,
                    metadata
                );
                if (snapshot.state === "success") {
                    //create a User with the provided credentials
                    const user = await User.create({
                        name,
                        email,
                        photoPathFirestore: storagePath,
                    });
                    console.log("Successfully created new user in DB!");
                    return {
                        displayName: user.name,
                        customClaims: {
                            role: "user",
                            userId: user._id,
                        },
                    };
                } else {
                    throw new Error("Error occurred while creating User");
                }
            }
        } else {
            //registering with email and password
            //first user is created in DB, hence assign role based on that created user
            if (checkUser) {
                return {
                    customClaims: {
                        role: "user",
                    },
                };
            }
            return {
                customClaims: {
                    role: "org",
                },
            };
        }
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
});

export const beforesignin = beforeUserSignedIn(async (event) => {
    try {
        const email = event.data.email;
        const checkUser = await User.findOne({ email });

        if (checkUser) {
            return {
                displayName: checkUser.name,
                customClaims: {
                    role: "user",
                    userId: checkUser._id,
                },
            };
        } else {
            const checkOrg = await Organization.findOne({ email });
            if (checkOrg) {
                return {
                    displayName: checkOrg.name,
                    customClaims: {
                        role: "org",
                        orgId: checkOrg._id,
                    },
                };
            } else {
                return {
                    customClaims: {
                        role: null,
                    },
                };
            }
        }
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
});
