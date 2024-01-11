import express from "express";
import User from "../models/user.model.js";
import dotenv from "dotenv";
import { storage } from "../index.js";
import { ref, uploadBytesResumable } from "firebase/storage";
import { response_200, response_400 } from "../utils/responseCodes.js";

dotenv.config();
const router = express.Router();

// Create a new user
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const file = req.files[0];
        const filename = file.originalname;
        console.log(name, email, password);

        const extension = filename.split(".").pop();
        console.log(extension);

        //email variable, update record in DB

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
            const pathToFile = `/${email}/profile_${Date.now()}.jpg`;
            const storageRef = ref(storage, pathToFile);

            const metadata = {
                contentType: file.mimetype,
            };

            const snapshot = await uploadBytesResumable(
                storageRef,
                file.buffer,
                metadata
            );

            const user = await User.create({
                name,
                email,
                password,
                photoPathFirestore: pathToFile,
            });
            console.log("Successfully created new user in DB!");
            response_200(res, "Successfully created new user in DB");
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

export default router;
