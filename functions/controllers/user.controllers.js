import express from "express";
import Organization from "../models/organization.model.js";
import {
    response_200,
    response_400,
    response_404,
    response_500,
} from "../utils/responseCodes.js";
import User from "../models/user.model.js";
import Community from "../models/community.model.js";
import Campaign from "../models/campaign.model.js";
import filesUpload from "../middlewares/upload.middleware.js";
import { storage } from "../index.js";
import { ref, uploadBytesResumable } from "firebase/storage";
import checkOrg from "../middlewares/checkOrg.middleware.js";
import checkUser from "../middlewares/checkOrg.middleware.js";

const router = express.Router();

//for organization profile
router.get("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

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
            const user = await User.findByIdAndUpdate(userId, {
                photoPathFirestore: pathToFile,
            });
            console.log("Successfully updated user's profile in DB!");
            response_200(res, "Successfully updated user in DB", user);
        } else {
            response_500(res, "Error occurred while uploading user file");
        }
    }
});

export default router;
