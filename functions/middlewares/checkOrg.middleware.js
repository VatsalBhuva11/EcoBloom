import jwt from "jsonwebtoken";
import {
    response_400,
    response_401,
    response_500,
} from "../utils/responseCodes.js";
export default async function checkUser(req, res, next) {
    try {
        const token = req.headers["X-AccountData"];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decoded) {
            const role = decoded.role;
            if (role === "org") {
                req.user = decoded;
                next();
            } else {
                response_401(res, "Unauthorized access.");
            }
        } else {
            response_400(res, "Malformed JWT obtained.");
        }
    } catch (err) {
        console.log(err);
        response_500(res, "Error occurred while verifying org", err);
    }
}
