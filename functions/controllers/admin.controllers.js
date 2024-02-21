import Organization from "../models/organization.model.js";
import { response_200, response_500 } from "../utils/responseCodes.js";

export const verifyOrg = async (req, res) => {
    try {
        const userId = req.user.userId;
        const orgId = req.query.orgId;
        const verifyOrg = await Organization.findOneAndUpdate(
            { firebaseId: orgId },
            {
                isVerified: true,
            },
            { new: true }
        );

        if (!verifyOrg) {
            response_500(res, "Error occurred while verifying organisation");
        } else {
            response_200(res, "Successfully verified organisation", verifyOrg);
        }
    } catch (err) {
        console.log(err);
    }
};
