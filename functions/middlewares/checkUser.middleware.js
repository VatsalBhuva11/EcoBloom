import jwt from "jsonwebtoken";
import {
    response_400,
    response_401,
    response_500,
} from "../utils/responseCodes";
import { auth } from "../config/firebase.config.js";
export default async function checkUser(req, res, next) {
    console.log("CURRENT USER: ", auth.currentUser);
    auth.currentUser
        .getIdTokenResult()
        .then((idTokenResult) => {
            console.log("CLAIMS: ", idTokenResult.claims);
            if (idTokenResult.claims.role === "user") {
                next();
            } else {
                response_401(res, "Unauthorized access.");
            }
        })
        .catch((error) => {
            console.log(error);
            response_500(res, "Error occurred while verifying user", error);
        });
    // try {
    //     const token = req.headers["X-AccountData"];
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    //     if (decoded) {
    //         const role = decoded.role;
    //         if (role === "user") {
    //             req.user = decoded;
    //             next();
    //         } else {
    //             response_401(res, "Unauthorized access.");
    //         }
    //     } else {
    //         response_400(res, "Malformed JWT obtained.");
    //     }
    // } catch (err) {
    //     console.log(err);
    //     response_500(res, "Error occurred while verifying user", err);
    // }
}
