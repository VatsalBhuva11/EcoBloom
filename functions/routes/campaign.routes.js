import express from "express";
import {
    createCampaign,
    upcomingCampaigns,
} from "../controllers/campaign.controllers.js";
import checkOrg from "../middlewares/checkOrg.middleware.js";

const router = express.Router();

router.post("/create", checkOrg, createCampaign);

router.get("/upcoming", upcomingCampaigns);

export default router;
