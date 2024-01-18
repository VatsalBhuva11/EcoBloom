import {
    response_400,
    response_401,
    response_500,
} from "../utils/responseCodes.js";
import { auth } from "../config/firebase.config.js";
export default async function checkUser(req, res, next) {
    try {
        if (auth.currentUser) {
            auth.currentUser.getIdTokenResult().then((idTokenResult) => {
                if (idTokenResult.claims.role === "user") {
                    next();
                } else {
                    response_401(res, "Unauthorized");
                }
            });
        } else {
            response_400(res, "User not logged in");
        }
    } catch (err) {
        console.log(err);
        response_500(res, "Error occurred while verifying org status");
    }
}
