import express from "express";
import {
    createCampaign,
    getCampaign,
    registerUser,
    upcomingCampaigns,
    verifyUser,
    getCampaigns,
} from "../controllers/campaign.controllers.js";
import checkOrg from "../middlewares/checkOrg.middleware.js";
import checkUser from "../middlewares/checkUser.middleware.js";
import filesUpload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.get("/", getCampaigns);
router.post("/create", checkOrg, createCampaign);

router.get("/upcoming", upcomingCampaigns);

router.post("/:campaignId/verifyUser", filesUpload, verifyUser);
router.post("/:campaignId/register", checkUser, registerUser);
router.get("/:campaignId", getCampaign);

export default router;
