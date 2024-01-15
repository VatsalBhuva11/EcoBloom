import express from "express";
import User from "../models/user.model.js";
import dotenv from "dotenv";
import { storage } from "../index.js";
import { ref, uploadBytesResumable } from "firebase/storage";
import {
    response_200,
    response_400,
    response_500,
} from "../utils/responseCodes.js";

dotenv.config();
const router = express.Router();

// Create a new user
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        const file = req.files[0];
        const filename = file.originalname;

        //email variable, update record in DB
        if (!name || !email || !password || !file) {
            throw new Error(
                "Following fields are mandatory: name, email, password, photo"
            );
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
                    });
                    console.log("Successfully created new user in DB!");
                    response_200(res, "Successfully created new user in DB");
                } else {
                    response_500(
                        res,
                        "Error occurred while uploading user file"
                    );
                }
            }
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

export default router;
