import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.config.js";
import router from "./routes/index.routes.js";
import { onRequest } from "firebase-functions/v2/https";
import { beforeUserCreated } from "firebase-functions/v2/identity";
import User from "./models/user.model.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();
//https://ecobloom-rsxx5czyua-uc.a.run.app
app.get("/", (req, res) => {
    const message = "EcoBloom API at /";
    res.json(message);
});

//https://ecobloom-rsxx5czyua-uc.a.run.app/api
app.get("/api", (req, res) => {
    const message = "EcoBloom API at /api";
    res.json(message);
});

app.use("/api", router);

export const beforecreated = beforeUserCreated(async (event) => {
    const checkUser = await User.findOne({ email: event.data.email });
    console.log("EVENT: ", event);
    if (checkUser) {
        return {
            customClaims: {
                role: "user",
            },
        };
    }
    return {
        customClaims: {
            role: "org",
        },
    };
});

export const ecobloom = onRequest({ cors: true }, app);
// export { storage };
