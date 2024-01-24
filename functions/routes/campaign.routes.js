import express from "express";
import {
    createCampaign,
    upcomingCampaigns,
    verifyUser,
} from "../controllers/campaign.controllers.js";
import checkOrg from "../middlewares/checkOrg.middleware.js";
import filesUpload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/create", checkOrg, createCampaign);

router.get("/upcoming", upcomingCampaigns);

router.post("/verifyUser", filesUpload, verifyUser);

export default router;
