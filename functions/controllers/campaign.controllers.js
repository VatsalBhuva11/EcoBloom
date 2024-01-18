import { response_200, response_500 } from "../utils/responseCodes.js";
import Campaign from "../models/campaign.model.js";
import Organization from "../models/organization.model.js";

export const createCampaign = async (req, res) => {
    try {
        // const org = req.org.orgId;
        const org = "65a999322edc063a30d6f72f";
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
};
