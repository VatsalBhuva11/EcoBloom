import {
    response_401,
    response_403,
    response_500,
} from "../utils/responseCodes.js";
import User from "../models/user.model.js";

import { auth } from "../config/firebaseAdmin.config.js";
export default async function checkUser(req, res, next) {
    try {
        let token = req.headers["authorization"];
        token = token.split(" ")[1];
        auth.verifyIdToken(token)
            .then(async (decodedToken) => {
                // OBTAINING FIREBASE ID FROM CLIENT
                // ADDING THE DB ID THROUGH MIDDLEWARE IN req.user
                console.log("decoded token from checkUser: ", decodedToken);
                const getUser = await User.findOne({
                    firebaseId: decodedToken.user_id,
                });
                if (!decodedToken.role || decodedToken.role === "user") {
                    req.user = {
                        userId: getUser._id,
                        name: getUser.name,
                        email: getUser.email,
                    };
                    console.log("User verified");
                    next();
                } else {
                    response_403(res, "Forbidden");
                }
            })
            .catch((error) => {
                response_401(res, "Login first as a user.");
            });
    } catch (err) {
        response_500(res, "Error occurred while verifying user", err);
    }
}
