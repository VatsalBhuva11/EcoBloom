import {
    response_401,
    response_403,
    response_500,
} from "../utils/responseCodes.js";
import User from "../models/user.model.js";

import { auth } from "../config/firebaseAdmin.config.js";
export default async function checkAdmin(req, res, next) {
    try {
        let token = req.headers["authorization"];
        token = token.split(" ")[1];
        auth.verifyIdToken(token)
            .then(async (decodedToken) => {
                console.log("decoded token from checkUser: ", decodedToken);
                console.log({
                    firebaseId: decodedToken.user_id,
                });
                const getUser = await User.findOne({
                    firebaseId: decodedToken.user_id,
                    isAdmin: true,
                });
                console.log("getUser: ", getUser);
                if (getUser && decodedToken.role === "admin") {
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
                response_401(res, "Login first as an admin.");
            });
    } catch (err) {
        response_500(res, "Error occurred while verifying admin", err);
    }
}
