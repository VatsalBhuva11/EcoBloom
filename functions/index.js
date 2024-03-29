import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.config.js";
import router from "./routes/index.routes.js";
import { onRequest, onCall } from "firebase-functions/v2/https";
import { auth as firebaseAuth } from "firebase-functions";
import {
    beforeUserCreated,
    beforeUserSignedIn,
} from "firebase-functions/v2/identity";
import User, { User as UserSchema } from "./models/user.model.js";
import Organization from "./models/organization.model.js";
import Campaign from "./models/campaign.model.js";
import { storage } from "./config/firebase.config.js";
import { ref, uploadBytesResumable } from "firebase/storage";
import fetch from "node-fetch";
import { onSchedule } from "firebase-functions/v2/scheduler";
import { setGlobalOptions } from "firebase-functions/v2";
import { auth } from "./config/firebaseAdmin.config.js";
import mongoose from "mongoose";

mongoose.model("User", UserSchema);

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

setGlobalOptions({ maxInstances: 10 });

export const ecobloom = onRequest({ cors: true }, app);

export const setCustomClaims = onCall(async (data, context) => {
    try {
        // Set custom claims for the user
        const { role, firebaseId } = data.data;
        const uid = firebaseId;
        console.log("data: ", data.data);
        if (role === "user") {
            await auth.setCustomUserClaims(uid, {
                role: role, // Example custom claim
                userId: firebaseId,
                // Add more custom claims as needed
            });
        } else {
            await auth.setCustomUserClaims(uid, {
                role: role, // Example custom claim
                orgId: firebaseId,
                isVerified: false,
                // Add more custom claims as needed
            });
        }
        console.log("User from setCustomClaims: ", firebaseId);
    } catch (error) {
        console.error("Error setting custom claims:", error);
        throw new Error(error);
    }
});
// export const beforecreated = beforeUserCreated(async (event) => {
//     try {
//         const email = event.data.email;
//         const checkUser = await User.findOne({ email: event.data.email });

//         //when sign in with google is clicked
//         if (event.additionalUserInfo.providerId === "google.com") {
//             const checkOrg = await Organization.findOne({ email });
//             if (checkUser) {
//                 return {
//                     displayName: checkUser.name,
//                     customClaims: {
//                         role: "user",
//                         userId: checkUser._id,
//                     },
//                 };
//             } else if (checkOrg) {
//                 return {
//                     displayName: checkUser.name,
//                     customClaims: {
//                         role: "org",
//                         orgId: checkUser._id,
//                     },
//                 };
//             } else {
//                 //google sign in and user not in db
//                 //create user in db
//                 const name = event.data.displayName;
//                 const email = event.data.email;
//                 const photoURL = event.data.photoURL;

//                 const response = await fetch(photoURL);
//                 const buffer = await response.arrayBuffer();
//                 console.log("BUFFER: ", buffer);
//                 const storagePath = `user/${email}/profile.jpeg`;
//                 const storageRef = ref(storage, storagePath);
//                 const metadata = {
//                     contentType: "image/jpeg",
//                 };
//                 const snapshot = await uploadBytesResumable(
//                     storageRef,
//                     buffer,
//                     metadata
//                 );
//                 if (snapshot.state === "success") {
//                     const user = await User.create({
//                         name,
//                         email,
//                         photoPathFirestore: storagePath,
//                     });
//                     console.log("Successfully created new user in DB!");
//                     return {
//                         displayName: user.name,
//                         customClaims: {
//                             role: "user",
//                             userId: user._id,
//                         },
//                     };
//                 } else {
//                     throw new Error("Error occurred while creating User");
//                 }
//             }
//         } else {
//             //email/password sign in
//             if (checkUser) {
//                 return {
//                     customClaims: {
//                         role: "user",
//                     },
//                 };
//             }
//             return {
//                 customClaims: {
//                     role: "org",
//                 },
//             };
//         }
//     } catch (err) {
//         throw new Error(err);
//     }
// });

// export const beforesignin = beforeUserSignedIn(async (event) => {
//     try {
//         const email = event.data.email;
//         const checkUser = await User.findOne({ email });

//         if (checkUser) {
//             return {
//                 displayName: checkUser.name,
//                 customClaims: {
//                     role: "user",
//                     userId: checkUser._id,
//                 },
//             };
//         } else {
//             const checkOrg = await Organization.findOne({ email });
//             return {
//                 displayName: checkOrg.name,
//                 customClaims: {
//                     role: "org",
//                     orgId: checkOrg._id,
//                 },
//             };
//         }
//     } catch (err) {
//         console.log(err);
//         throw new Error(err);
//     }
// });

export const checkCompletedCampaigns = onSchedule(
    "every 10 minutes",
    async (event) => {
        console.log("Event from scheduler: ", event);
        try {
            // Retrieve all campaigns from the database
            const campaigns = await Campaign.find({
                isCompleted: false,
                endDate: {
                    $lte: new Date().toISOString(),
                },
            }).populate("verifiedUsers");
            console.log("campaigns to update: ", campaigns);

            // Iterate through campaigns and check if any have reached their end date
            const userUpdations = {};

            campaigns.forEach(async (campaign) => {
                // If the current date is after the campaign's end date
                // Update the campaign's status to "Completed"
                campaign.isCompleted = true;
                console.log("updated " + campaign.name);
                if (campaign.verifiedUsersCount > 0) {
                    campaign.verifiedUsers.forEach(async (user) => {
                        if (
                            !userUpdations[user._id] ||
                            Object.keys(userUpdations[user._id]).length === 0
                        ) {
                            userUpdations[user._id] = {
                                points: campaign.points,
                                completedCampaigns: [campaign._id],
                                activityLog: {
                                    content:
                                        `Congratulations on completing the campaign "${campaign.name}"! You have been awarded 🪙` +
                                        campaign.points +
                                        " points!",
                                    date: new Date(),
                                    type: "completedCampaign",
                                },
                            };
                        } else {
                            userUpdations[user._id].points += campaign.points;
                            userUpdations[user._id].completedCampaigns.push(
                                campaign._id
                            );
                        }
                    });
                }

                await campaign.save();
            });
            const userUpdationPromises = Object.keys(userUpdations).map(
                async (userId) => {
                    const user = await User.findById(userId);
                    user.points += userUpdations[userId].points;
                    user.completedCampaigns.push(
                        ...userUpdations[userId].completedCampaigns
                    );
                    await user.save();
                }
            );
            console.log("userUpdations: ", userUpdations);
            console.log("userUpdationPromises: ", userUpdationPromises);
            await Promise.all(userUpdationPromises);
        } catch (error) {
            console.error("Error in scheduled task:", error);
        }
    }
);
