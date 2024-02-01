import express from "express";
import {
    createCampaign,
    getCampaign,
    registerUser,
    upcomingCampaigns,
    verifyUser,
} from "../controllers/campaign.controllers.js";
import checkOrg from "../middlewares/checkOrg.middleware.js";
import checkUser from "../middlewares/checkUser.middleware.js";
import filesUpload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/create", checkOrg, createCampaign);

router.get("/upcoming", upcomingCampaigns);

router.post("/verifyUser", filesUpload, verifyUser);

router.get("/:campaignId", getCampaign);

router.post("/:campaignId/register", checkUser, registerUser);

export default router;
