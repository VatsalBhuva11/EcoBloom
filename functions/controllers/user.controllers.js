import express from "express";
import {
    response_200,
    response_400,
    response_404,
    response_500,
} from "../utils/responseCodes.js";
import Community, {
    Community as CommunitySchema,
} from "../models/community.model.js";
import Campaign, {
    Campaign as CampaignSchema,
} from "../models/campaign.model.js";
import User from "../models/user.model.js";
import filesUpload from "../middlewares/upload.middleware.js";
import { storage } from "../config/firebase.config.js";

import { ref, uploadBytesResumable } from "firebase/storage";
// import checkOrg from "../middlewares/checkOrg.middleware.js";
import checkUser from "../middlewares/checkUser.middleware.js";
import mongoose from "mongoose";
import Jimp from "jimp";

const router = express.Router();

//required for populating the registeredCampaigns and completedCampaigns
mongoose.model("Community", CommunitySchema);
mongoose.model("Campaign", CampaignSchema);

//for organization profile
router.get("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId)
            .populate("registeredCampaigns")
            .populate("completedCampaigns")
            .populate("communities");

        if (!user) {
            response_404(
                res,
                "The organization is not yet registered with us."
            );
        } else {
            const {
                name,
                email,
                photoPathFirestore,
                registeredCampaigns,
                completedCampaigns,
                communities,
            } = user;

            let data = {
                name,
                email,
                photoPathFirestore,
                registeredCampaigns,
                completedCampaigns,
                communities,
            };
            response_200(res, "Successfully fetched user data!", data);
        }
    } catch (err) {
        console.log(err);
        response_500(res, "Error occurred while fetching user details", err);
    }
});

//updating the user's details (profile only possible)
router.patch("/:userId/profile", checkUser, filesUpload, async (req, res) => {
    try {
        const type = req.query.type;

        const userId = req.params.userId;

        const checkUser = await User.findById(userId);
        if (!checkUser) {
            response_404(res, "User not found");
        }

        //no need of updating profile photo path, just update in storage
        //constant filenames with extensions

        const toUpdate = {
            photoPathFirestore: checkUser.photoPathFirestore,
            phone: checkUser.phone,
        };
        if (type === "photo") {
            const file = req.files[0];
            const filename = file.originalname;
            const extension = filename.split(".").pop();
            //email variable, update record in DB

            if (
                extension !== "png" &&
                extension !== "jpg" &&
                extension !== "jpeg"
            ) {
                response_400(
                    res,
                    "Invalid file format. Only .jpg, .png, .jpeg files are allowed"
                );
            } else {
                // const pathToFile = `/user/vatsalbhuva11@gmail.com/profile.${extension}`;
                Jimp.read(file.buffer)
                    .then((image) => {
                        // Convert the image to JPEG with quality 100 (you can adjust the quality as needed)
                        return image
                            .quality(100)
                            .getBufferAsync(Jimp.MIME_JPEG);
                    })
                    .then(async (jpegBuffer) => {
                        console.log("Image converted successfully!");
                        // Now you have the converted buffer (jpegBuffer) that you can use

                        const pathToFile = `user/${req.user.email}/profile.jpeg`;
                        const storageRef = ref(storage, pathToFile);
                        const metadata = {
                            contentType: "image/jpeg",
                        };

                        const snapshot = await uploadBytesResumable(
                            storageRef,
                            jpegBuffer,
                            metadata
                        );
                        console.log("Updated photo in storage");
                        if (snapshot.state === "success") {
                            toUpdate.photoPathFirestore = pathToFile;
                            const user = await User.findByIdAndUpdate(
                                userId,
                                toUpdate,
                                {
                                    new: true,
                                }
                            );
                            response_200(
                                res,
                                "Successfully updated user in DB",
                                {
                                    photoPathFirestore: user.photoPathFirestore,
                                    phone: user.phone,
                                }
                            );
                        } else {
                            response_500(
                                res,
                                "Error occurred while uploading user file"
                            );
                        }
                    })
                    .catch((err) => {
                        console.error("Error converting image:", err);
                        response_500(
                            res,
                            "Error occurred while converting image type"
                        );
                    });
            }
        }
        // if (type === "phone") {
        //     const { phone } = req.body;
        //     toUpdate.phone = phone;
        // }

        // const user = await User.findByIdAndUpdate(userId, toUpdate, {
        //     new: true,
        // });
        // console.log("Successfully updated user's profile in DB!");
        // response_200(res, "Successfully updated user in DB", {
        //     photoPathFirestore: user.photoPathFirestore,
        //     phone: user.phone,
        // });
    } catch (err) {
        console.log(err);
        response_500(res, "Error occurred while updating user details", err);
    }
});

//join community
router.post("/join/:communityId", checkUser, async (req, res) => {
    try {
        const communityId = req.params.communityId;
        // const userId = req.user.userId;
        const userId = req.user.userId;

        const community = await Community.findById(communityId);
        const user = await User.findById(userId);

        if (!community) {
            response_404(res, "Community not found");
        } else if (!user) {
            response_404(res, "User not found");
        } else {
            const isUserAlreadyRegistered =
                community.joinedUsers.includes(userId);
            if (isUserAlreadyRegistered) {
                response_400(res, "User is already registered");
            } else {
                const updatedCommunity = await Community.findByIdAndUpdate(
                    communityId,
                    {
                        $push: {
                            joinedUsers: userId,
                        },
                        userCount: community.userCount + 1,
                    },
                    {
                        new: true,
                    }
                );
                const updatedUser = await User.findByIdAndUpdate(
                    userId,
                    {
                        $push: {
                            communities: communityId,
                        },
                    },
                    {
                        new: true,
                    }
                );
                response_200(
                    res,
                    "Successfully joined the community",
                    updatedUser
                );
            }
        }
    } catch (err) {
        console.log(err);
        response_500(res, "Error occurred while joining community", err);
    }
});

export default router;
