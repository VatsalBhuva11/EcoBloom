import {
    response_401,
    response_403,
    response_500,
} from "../utils/responseCodes.js";
import Organization from "../models/organization.model.js";

import { auth } from "../config/firebaseAdmin.config.js";
export default async function checkOrg(req, res, next) {
    try {
        let token = req.headers["authorization"];
        token = token.split(" ")[1];
        auth.verifyIdToken(token)
            .then(async (decodedToken) => {
                const getOrg = await Organization.findOne({
                    firebaseId: decodedToken.user_id,
                });
                if (decodedToken.role === "org") {
                    req.org = {
                        orgId: getOrg._id,
                        name: getOrg.name,
                        email: getOrg.email,
                    };
                    next();
                } else {
                    response_403(res, "Forbidden");
                }
            })
            .catch((error) => {
                response_401(res, "Login first as an organization.");
            });
    } catch (err) {
        response_500(res, "Error occurred while verifying organization", err);
    }
}
