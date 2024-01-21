import { response_200, response_500 } from "../utils/responseCodes.js";
import Campaign from "../models/campaign.model.js";
import Organization, {
    Organization as OrganizationSchema,
} from "../models/organization.model.js";
import mongoose from "mongoose";

mongoose.model("Organization", OrganizationSchema);

export const createCampaign = async (req, res) => {
    try {
        // const org = req.org.orgId;
        const org = "65aba920aa0bdd0670b2dc75";
        const { address, city, country, latitude, longitude, startDate, type } =
            req.body;
        if (
            !address ||
            !city ||
            !country ||
            !latitude ||
            !longitude ||
            !startDate ||
            !type
        ) {
            console.log(req.body);
            return response_500(res, "Please enter all fields");
        } else {
            const campaign = await Campaign.create({
                ...req.body,
                status: "UPCOMING",
                organization: org,
            });
            const updateOrg = await Organization.findByIdAndUpdate(org, {
                $push: { campaigns: campaign._id },
            });
            response_200(res, "Successfully created campaign", campaign);
        }
    } catch (err) {
        console.log(err);
        response_500(res, "Error occurred while creating campaign", err);
    }
};

//get upcoming campaigns
export const upcomingCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find({
            status: "UPCOMING",
        }).populate("organization");
        campaigns.sort((a, b) => {
            return a.startDate - b.startDate;
        });
        response_200(res, "Successfully fetched upcoming campaigns", campaigns);
    } catch (err) {
        console.log(err);
        response_500(
            res,
            "Error occurred while fetching upcoming campaigns",
            err
        );
    }
};
