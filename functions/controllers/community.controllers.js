import {
    response_200,
    response_500,
    response_404,
    response_400,
} from "../utils/responseCodes.js";

import Community from "../models/community.model.js";
import User from "../models/user.model.js";
import Organization from "../models/organization.model.js";

export const getCommunity = async (req, res) => {
    try {
        const orgId = req.params.orgId;
        const org = await Organization.findOne({ firebaseId: orgId });
        if (!org) {
            response_404(res, "org not found");
        }

        const community = await Community.findOne({
            organization: org._id,
        }).populate("joinedUsers");

        response_200(res, "Successfully fetched community data", community);
    } catch (err) {
        console.log(err);
        response_500(res, "Error occurred while getting community data", err);
    }
};

export const joinCommunity = async (req, res) => {
    try {
        const orgId = req.params.orgId;
        const userId = req.user.userId;
        const org = await Organization.findOne({ firebaseId: orgId });
        if (!org) {
            response_404(res, "org not found");
        }
        const community = await Community.findOne({
            organization: org._id,
        });
        const user = await User.findById(userId);

        if (!community) {
            response_404(res, "Community not found");
        } else if (!user) {
            response_404(res, "User not found");
        } else {
            const isUserAlreadyRegistered =
                community?.joinedUsers?.includes(userId);
            if (isUserAlreadyRegistered) {
                response_200(res, "User is already registered", {
                    status: "already registered",
                });
            } else {
                const updatedCommunity = await Community.findByIdAndUpdate(
                    community._id,
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
                            communities: community._id,
                            activityLog: {
                                type: "joinedCommunity",
                                content: `Successfully joined ${community.orgName}'s community!`,
                                date: new Date(),
                            },
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
};

export const leaveCommunity = async (req, res) => {
    try {
        const orgId = req.params.orgId;
        const userId = req.user.userId;
        const org = await Organization.findOne({ firebaseId: orgId });
        if (!org) {
            response_404(res, "org not found");
        }
        const community = await Community.findOne({
            organization: org._id,
        });
        const user = await User.findById(userId);

        if (!community) {
            response_404(res, "Community not found");
        } else if (!user) {
            response_404(res, "User not found");
        } else {
            const isUserAlreadyRegistered =
                community?.joinedUsers?.includes(userId);
            if (!isUserAlreadyRegistered) {
                response_200(res, "User is not registered", {
                    status: "not registered",
                });
            } else {
                const updatedCommunity = await Community.findByIdAndUpdate(
                    community._id,
                    {
                        $pull: {
                            joinedUsers: userId,
                        },
                        userCount: community.userCount - 1,
                    },
                    {
                        new: true,
                    }
                );
                const updatedUser = await User.findByIdAndUpdate(
                    userId,
                    {
                        $pull: { communities: community._id },
                        $push: {
                            activityLog: {
                                type: "leftCommunity",
                                content: `Successfully left ${community.orgName}'s community!`,
                                date: new Date(),
                            },
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
};
