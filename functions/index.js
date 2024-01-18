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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

export const beforecreated = beforeUserCreated(async (event) => {
    try {
        const email = event.data.email;
        const checkUser = await User.findOne({ email: event.data.email });
        if (event.additionalUserInfo.providerId === "google.com") {
            const checkOrg = await Organization.findOne({ email });
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
                console.log("Coming in else");
                const name = event.data.displayName;
                const email = event.data.email;
                const photoURL = event.data.photoURL;

                const response = await fetch(photoURL);
                const buffer = await response.arrayBuffer();
                console.log("BUFFER: ", buffer);
                const storagePath = `/user/${email}/profile.jpg`;
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
            return {
                displayName: checkOrg.name,
                customClaims: {
                    role: "org",
                    orgId: checkOrg._id,
                },
            };
        }
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
});
