import express from "express";
import User from "../models/user.model.js";
import dotenv from "dotenv";
import { storage } from "../config/firebase.config.js";

import { ref, uploadBytesResumable } from "firebase/storage";

import {
    response_200,
    response_400,
    response_500,
} from "../utils/responseCodes.js";
import Jimp from "jimp";

dotenv.config();
const router = express.Router();

// Create a new user
router.post("/register", async (req, res) => {
    try {
        //photoURL is sent only when google sign in results in creation of new account.
        const { name, email, phone, photoURL, firebaseId } = req.body;

        //email variable, update record in DB
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            response_400(res, "user already exists");
        }
        if (!name || !email) {
            throw new Error(
                "Following fields are mandatory: name, email, password, photo"
            );
        } else {
            if (photoURL) {
                // fetch and store the image from the google profile URL in cloud storage.
                // store the path in the user record in the DB

                const response = await fetch(photoURL);
                const buffer = await response.arrayBuffer();
                console.log("BUFFER: ", buffer);
                const storagePath = `user/${email}/profile.jpeg`;
                const storageRef = ref(storage, storagePath);
                const metadata = {
                    contentType: "image/jpeg",
                };
                const snapshot = await uploadBytesResumable(
                    storageRef,
                    buffer,
                    metadata
                );
                if (snapshot.state === "success") {
                    const user = await User.create({
                        firebaseId,
                        name,
                        email,
                        photoPathFirestore: storagePath,
                        phone,
                    });
                    console.log("Successfully created new user in DB!");
                    response_200(res, "Successfully created new user in DB", {
                        _id: user._id,
                    });
                } else {
                    response_500(
                        res,
                        "Error occurred while uploading user file"
                    );
                }
            } else {
                if (!req.files[0]) {
                    throw new Error(
                        "Following fields are mandatory: name, email, password, photo"
                    );
                }
                const file = req.files[0];
                const filename = file.originalname;
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
                    // Resize image and get extension
                    console.log("size: ", file.size);
                    console.log("greater? : ", file.size > 100000);
                    if (file.size > 100000) {
                        response_400(
                            res,
                            "File size should be less than 100kb"
                        );
                    } else {
                        Jimp.read(file.buffer)
                            .then((image) => {
                                // Convert the image to JPEG with quality 100 (you can adjust the quality as needed)
                                return image
                                    .quality(100)
                                    .getBufferAsync(Jimp.MIME_JPEG);
                            })
                            .then(async (jpegBuffer) => {
                                console.log("Image converted successfully!");
                                // Now you have the converted buffer (jpegBuffer) that you can use

                                const pathToFile = `user/${email}/profile.jpeg`;
                                const storageRef = ref(storage, pathToFile);

                                const metadata = {
                                    contentType: "image/jpeg",
                                };

                                const snapshot = await uploadBytesResumable(
                                    storageRef,
                                    jpegBuffer,
                                    metadata
                                );
                                if (snapshot.state === "success") {
                                    const user = await User.create({
                                        firebaseId,
                                        name,
                                        email,
                                        photoPathFirestore: pathToFile,
                                        phone,
                                    });
                                    console.log(
                                        "Successfully created new user in DB!"
                                    );
                                    response_200(
                                        res,
                                        "Successfully created new user in DB",
                                        {
                                            _id: user._id,
                                        }
                                    );
                                } else {
                                    response_500(
                                        res,
                                        "Error occurred while uploading user file"
                                    );
                                }
                            })
                            .catch((err) => {
                                console.error("Error converting image:", err);
                                response_500(res, "Error converting image");
                            });
                    }
                }
            }
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

export default router;
