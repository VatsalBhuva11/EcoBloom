import express from "express";
import User from "../models/user.model.js";
import dotenv from "dotenv";
import { storage } from "../index.js";
import { ref, uploadBytesResumable } from "firebase/storage";
import jwt from "jsonwebtoken";
import filesUpload from "../middlewares/upload.middleware.js";

import {
    response_200,
    response_400,
    response_404,
    response_500,
} from "../utils/responseCodes.js";

dotenv.config();
const router = express.Router();

// Create a new user
router.post("/register", filesUpload, async (req, res) => {
    try {
        const { name, email, password, phone, firebaseUid } = req.body;
        const file = req.files[0];
        const filename = file.originalname;

        //email variable, update record in DB
        if (!name || !email || !password || !file) {
            throw new Error(
                "Following fields are mandatory: name, email, password, photo"
            );
        } else {
            if (password.length < 6) {
                response_400(res, "Password length must be atleast 6.");
            } else {
                const extension = filename.split(".").pop();
                if (
                    extension !== "png" &&
                    extension !== "jpg" &&
                    extension !== "jpeg"
                ) {
                    response_400(
                        res,
                        "Invalid file format. Only .jpg, .png, .jpeg files are allowed"
                    );
                } else {
                    const pathToFile = `/user/${email}/profile.${extension}`;
                    const storageRef = ref(storage, pathToFile);

                    const metadata = {
                        contentType: file.mimetype,
                    };

                    const snapshot = await uploadBytesResumable(
                        storageRef,
                        file.buffer,
                        metadata
                    );
                    if (snapshot.state === "success") {
                        const user = await User.create({
                            name,
                            email,
                            photoPathFirestore: pathToFile,
                            phone,
                            firebaseUid,
                        });
                        console.log("Successfully created new user in DB!");
                        response_200(
                            res,
                            "Successfully created new user in DB"
                        );
                    } else {
                        response_500(
                            res,
                            "Error occurred while uploading user file"
                        );
                    }
                }
            }
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        if (!email || !password) {
            response_400(res, "Email and password are required.");
        } else {
            const checkUser = await User.findOne({ email });
            if (!checkUser) {
                response_404(res, "User not found. Please register first.");
            } else {
                const token = jwt.sign(
                    {
                        role: "user",
                        name: checkUser.name,
                        email,
                        userId: checkUser._id,
                    },
                    process.env.JWT_SECRET_KEY
                );
                response_200(res, "Token generated", token);
            }
        }
    } catch (err) {
        console.log(err);
        response_500(res, "Error occurred while logging in user", err);
    }
});

export default router;
