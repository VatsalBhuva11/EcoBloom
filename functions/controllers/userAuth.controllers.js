import express from "express";
import User from "../models/user.model.js";
import filesUpload from "../middlewares/upload.middleware.js";
import dotenv from "dotenv";
import {
    getStorage,
    ref,
    getDownloadURL,
    uploadBytesResumable,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../config/firebase.config.js";

dotenv.config();
const router = express.Router();
initializeApp(firebaseConfig);
const storage = getStorage();

// Create a new user
router.post("/register", filesUpload, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(req.body);
        const file = req.files[0];
        const filename = file.originalname;
        const pathToFile = `/profile/${filename}_${Date.now()}`;
        console.log(pathToFile);
        const storageRef = ref(storage, pathToFile);

        const metadata = {
            contentType: file.mimetype,
        };

        const snapshot = await uploadBytesResumable(
            storageRef,
            file.buffer,
            metadata
        );
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log("File uploaded successfully!");
        res.json({
            downloadURL,
            pathToFile,
            filename,
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

export default router;

// const { name, email, password } = req.body;

// const user = await User.create({
//     name,
//     email,
//     password,
// });
// console.log("Successfully created new user in DB!");
// res.json(user);
