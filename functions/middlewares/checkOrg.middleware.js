import {
    response_401,
    response_403,
    response_500,
} from "../utils/responseCodes.js";

import { auth } from "../config/firebaseAdmin.config.js";
export default async function checkOrg(req, res, next) {
    try {
        let token = req.headers["authorization"];
        token = token.split(" ")[1];

        auth.verifyIdToken(token)
            .then((decodedToken) => {
                if (decodedToken.role === "org") {
                    req.org = {
                        orgId: decodedToken.orgId,
                        name: decodedToken.name,
                        email: decodedToken.email,
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
