import {
    response_200,
    response_404,
    response_500,
} from "../utils/responseCodes.js";
import Campaign from "../models/campaign.model.js";
import Organization, {
    Organization as OrganizationSchema,
} from "../models/organization.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

mongoose.model("Organization", OrganizationSchema);

export const getCampaign = async (req, res) => {
    try {
        const campaignId = req.params.campaignId;
        const campaign = await Campaign.findById(campaignId)
            .populate("organization")
            .populate("registeredUsers");
        // console.log("checking campaigns: ", campaigns);
        if (!campaign) {
            response_404(res, "Campaign not found");
        } else {
            response_200(res, "Successfully fetched campaign", campaign);
        }
    } catch (err) {
        console.log(err);
        response_500(res, "Error occurred while fetching campaign", err);
    }
};

export const getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find().populate("organization");
        response_200(res, "Successfully fetched campaigns", campaigns);
    } catch (err) {
        console.log(err);
        response_500(res, "Error occurred while fetching campaigns", err);
    }
};

export const createCampaign = async (req, res) => {
    try {
        const org = req.org.orgId;
        const {
            address,
            city,
            country,
            startDate,
            endDate,
            goal,
            locationType,
        } = req.body;
        if (
            !address ||
            !city ||
            !country ||
            !startDate ||
            !endDate ||
            !goal ||
            !locationType
            // !latitude ||
            // !longitude
        ) {
            return response_500(res, "Please enter all fields");
        } else {
            const campaign = await Campaign.create({
                ...req.body,
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

export const upcomingCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find({
            endDate: { $gte: new Date().toISOString() },
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

export const registerUser = async (req, res) => {
    try {
        const campaignId = req.params.campaignId;
        const userId = req.user.userId;

        const campaign = await Campaign.findById(campaignId).populate(
            "organization"
        );
        if (!campaign) {
            response_404(res, "Campaign not found");
        } else {
            const user = await User.findById(userId);
            if (!user) {
                response_404(res, "User not found");
            } else {
                const updateCampaign = await Campaign.findByIdAndUpdate(
                    campaignId,
                    {
                        $push: { registeredUsers: userId },
                        registeredUsersCount: campaign.registeredUsersCount + 1,
                    }
                );
                const updateUser = await User.findByIdAndUpdate(userId, {
                    $push: {
                        registeredCampaigns: campaignId,
                        activityLog: {
                            type: "registeredForCampaign",
                            content: `Registered for campaign "${campaign.name}" organized by ${campaign.organization.name}`,
                            date: new Date(),
                        },
                    },
                });
                response_200(res, "Successfully registered for campaign");
            }
        }
    } catch (err) {
        console.log(err);
        response_500(
            res,
            "Error occurred while registering user for campaign",
            err
        );
    }
};

export const verifyUser = async (req, res) => {
    try {
        const file = req.files[0];
        // >    fieldname: 'upload',
        // >    originalname: 'image.jpeg',
        // >    encoding: '7bit',
        // >    mimeType: 'image/jpeg',
        // >    buffer: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff e2 01 d8 49 43 43 5f 50 52 4f 46 49 4c 45 00 01 01 00 00 01 c8 00 00 00 00 04 30 00 00 ... 28304 more bytes>,
        // >    size: 28354
        const userId = req.query.userId;
        console.log(userId);
        const campaignId = req.params.campaignId;
        const user = await User.findOne({ firebaseId: userId });
        if (!user) {
            response_404(res, "User not found");
        }
        const campaign = await Campaign.findById(campaignId);
        if (!campaign) {
            response_404(res, "Campaign not found");
        }

        const blob = new Blob([file.buffer], { type: file.mimeType });
        // Get a v4 signed URL for reading the file
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/ecobloom-gdsc-challenge.appspot.com/o/${encodeURIComponent(
            user.photoPathFirestore
        )}?alt=media`;
        console.log("IMAGEURL: ", imageUrl);
        fetch(imageUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `Network response was not ok: ${response.status}`
                    );
                }
                return response.arrayBuffer();
            })
            .then((imageResponse) => {
                const blob2 = new Blob([imageResponse], {
                    type: "image/jpeg",
                });

                var formdata = new FormData();
                formdata.append("image_file1", blob, "me.jpeg");
                formdata.append("image_file2", blob2, "me2.jpeg");
                formdata.append("api_key", process.env.FACE_API_KEY);
                formdata.append("api_secret", process.env.FACE_API_SECRET);

                var requestOptions = {
                    method: "POST",
                    body: formdata,
                    redirect: "follow",
                };

                fetch(
                    "https://api-us.faceplusplus.com/facepp/v3/compare",
                    requestOptions
                )
                    .then((response) => response.json())
                    .then((result) => {
                        if (result.confidence >= 85) {
                            campaign.verifiedUsers.push(user._id);
                            campaign.verifiedUsersCount =
                                campaign.verifiedUsersCount + 1;
                            campaign.save();
                            user.activityLog.push({
                                type: "verifiedForCampaign",

                                content: `Your participation for campaign "${campaign.name}" has been verified!`,
                                date: new Date(),
                            });
                            user.save();
                            response_200(res, "Success", result);
                        } else {
                            response_404(res, "User not verified");
                        }
                    })
                    .catch((error) => {
                        console.log("error", error);
                    });
            })
            .catch((error) => {
                console.error("Error fetching image:", error);
            });
    } catch (err) {
        console.log(err);
        response_500(res, "Error occurred while comparing images", err);
    }
};
