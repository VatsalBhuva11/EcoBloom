import { auth } from "../config/firebaseAdmin.config.js";
import Organization from "../models/organization.model.js";
import { response_200, response_500 } from "../utils/responseCodes.js";

export const verifyOrg = async (req, res) => {
    const userId = req.user.userId;
    const orgId = req.query.orgId;
    try {
        const verifyOrg = await Organization.findOneAndUpdate(
            { firebaseId: orgId },
            {
                isVerified: true,
            },
            { new: true }
        );
        console.log("org updated in db");

        if (!verifyOrg) {
            response_500(res, "Error occurred while verifying organisation");
        } else {
            await auth.setCustomUserClaims(orgId, {
                role: "org", // Example custom claim
                orgId,
                isVerified: true,
                // Add more custom claims as needed
            });
            console.log("set claims");
            response_200(res, "Successfully verified organisation", verifyOrg);
        }
    } catch (err) {
        await Organization.findOneAndUpdate(
            { firebaseId: orgId },
            {
                isVerified: false,
            },
            { new: true }
        );
        console.log(err);
    }
};
