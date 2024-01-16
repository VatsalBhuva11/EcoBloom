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
import { storage } from "../index.js";
import { ref, uploadBytesResumable } from "firebase/storage";
// import checkOrg from "../middlewares/checkOrg.middleware.js";
import checkUser from "../middlewares/checkOrg.middleware.js";
import mongoose from "mongoose";

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

//updating the organization's details (logo, banner only possible)
router.patch("/:userId", checkUser, filesUpload, async (req, res) => {
    const userId = req.params.userId;
    const file = req.files[0];
    const filename = file.originalname;
    const extension = filename.split(".").pop();
    //email variable, update record in DB

    if (extension !== "png" && extension !== "jpg" && extension !== "jpeg") {
        response_400(
            res,
            "Invalid file format. Only .jpg, .png, .jpeg files are allowed"
        );
    } else {
        const pathToFile = `/user/${req.user.email}/profile.${extension}`;
        const storageRef = ref(storage, pathToFile);

        const metadata = {
            contentType: file.mimetype,
        };

        const snapshot = await uploadBytesResumable(
            storageRef,
            file.buffer,
            metadata
        );
        if (snapshot.state === "success") {
            const user = await User.findByIdAndUpdate(
                userId,
                {
                    photoPathFirestore: pathToFile,
                },
                {
                    new: true,
                }
            );
            console.log("Successfully updated user's profile in DB!");
            response_200(res, "Successfully updated user in DB", user);
        } else {
            response_500(res, "Error occurred while uploading user file");
        }
    }
});

//join community
router.post("/join/:communityId", async (req, res) => {
    try {
        const communityId = req.params.communityId;
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
