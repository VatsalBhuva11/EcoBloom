import express from "express";
import User from "../models/user.model.js";
import dotenv from "dotenv";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../config/firebase.config.js";

dotenv.config();
const router = express.Router();
initializeApp(firebaseConfig);
const storage = getStorage();

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
            // console.log(email);
            res.json(
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
            res.json(user);
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

export default router;
