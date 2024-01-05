import express from "express";
import User from "../models/user.model.js";
import filesUpload from "../middlewares/upload.middleware.js";
import dotenv from "dotenv";
import { Storage } from "@google-cloud/storage";
dotenv.config();
const router = express.Router();
const storage = new Storage();
const myBucket = storage.bucket(process.env.BUCKET_ID);

// Create a new user
router.post("/register", filesUpload, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(req.body);
        const file = req.files[0];
        const filename = file.originalname;
        const pathToFile = `/profile/${filename}_${Date.now()}`;
        const fileRef = myBucket.file(pathToFile);
        console.log(fileRef);

        const stream = fileRef.createWriteStream({
            metadata: {
                contentType: file.mimeType,
            },
            resumable: false,
        });

        stream.on("error", (err) => {
            console.log(err);
            res.json(err);
        });

        stream.on("finish", () => {
            fileRef.makePublic().then((publicUrl) => {
                res.json(publicUrl);
            });
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
