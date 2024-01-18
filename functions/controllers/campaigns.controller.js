import express from "express";
import { response_200, response_500 } from "../utils/responseCodes.js";
import Campaign from "../models/campaign.model.js";

const router = express.Router();

//required for populating the registeredCampaigns and completedCampaigns

//get upcoming campaigns
router.get("/upcoming", async (req, res) => {
    try {
        const communities = await Campaign.find({
            status: "upcoming",
        }).populate("campaigns");
        communities.sort((a, b) => {
            return a.startDate - b.startDate;
        });
        response_200(
            res,
            "Successfully fetched upcoming communities",
            communities
        );
    } catch (err) {
        console.log(err);
        response_500(
            res,
            "Error occurred while fetching upcoming communities",
            err
        );
    }
});

export default router;
