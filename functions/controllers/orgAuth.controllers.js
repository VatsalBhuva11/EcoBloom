import express from "express";
import Organization from "../models/organization.model.js";
import dotenv from "dotenv";
import { storage } from "../config/firebase.config.js";

import { ref, uploadBytesResumable } from "firebase/storage";
import jwt from "jsonwebtoken";
import {
    response_200,
    response_400,
    response_404,
    response_500,
} from "../utils/responseCodes.js";
import Community from "../models/community.model.js";
import Jimp from "jimp";

dotenv.config();
const router = express.Router();

// Create a new user
async function uploadPdf(email, file, extensions, paths) {
    const fileType = file.fieldname.toLowerCase().replace("optional", "");
    const pathToFile = `org/${email}/${fileType}.${extensions}`;
    const storageRef = ref(storage, pathToFile);
    // try application/pdf ?
    const metadata = {
        contentType: file.mimetype,
    };
    console.log(`metadata for ${file.originalname}: `, metadata);

    try {
        const response = await uploadBytesResumable(
            storageRef,
            file.buffer,
            metadata
        );
        console.log(response.state);
        if (!(response.state === "success")) {
            throw new Error(`Failed to upload ${file.originalname}`);
        }

        paths[fileType] = pathToFile;
        return `Successfully uploaded ${file.originalname}`;
    } catch (error) {
        console.error(`Error uploading ${fileType} file: ${error.message}`);
        throw error;
    }
}
async function uploadFile(email, file, paths) {
    const fileType = file.fieldname.toLowerCase().replace("optional", "");

    try {
        Jimp.read(file.buffer)
            .then((image) => {
                // Convert the image to JPEG with quality 100 (you can adjust the quality as needed)
                return image.quality(100).getBufferAsync(Jimp.MIME_JPEG);
            })
            .then(async (jpegBuffer) => {
                console.log("Image converted successfully!");
                // Now you have the converted buffer (jpegBuffer) that you can use
                const pathToFile = `org/${email}/${fileType}.jpeg`;

                const storageRef = ref(storage, pathToFile);

                const metadata = {
                    contentType: "image/jpeg",
                };

                const snapshot = await uploadBytesResumable(
                    storageRef,
                    jpegBuffer,
                    metadata
                );
                if (!(snapshot.state === "success")) {
                    throw new Error(`Failed to upload ${file.originalname}`);
                }
                console.log("pathToFile: ", pathToFile);
                paths[fileType] = pathToFile;
                console.log("paths: ", paths);
                return `Successfully uploaded ${file.originalname}`;
            })
            .catch((err) => {
                console.error("Error converting image:", err);
                throw new Error(`Failed to upload images: `, err);
            });
    } catch (error) {
        console.error(`Error uploading ${fileType} file: ${error.message}`);
        throw error;
    }
}

router.post("/register/stepOne", async (req, res) => {
    try {
        const { name, email, firebaseId } = req.body;
        if (!name || !email || !firebaseId) {
            throw new Error(
                "Following fields are mandatory: name, email, firebaseId"
            );
        } else {
            const checkUser = await Organization.findOne({ email });
            if (checkUser) {
                response_400(res, "Organization already exists.");
            } else {
                const org = await Organization.create({
                    email,
                    name,
                    firebaseId,
                });
                const community = await Community.create({
                    organization: org._id,
                    orgName: org.name,
                });
                if (org) {
                    console.log("Successfully created org with mail: ", email);
                    response_200(res, "Successfully created new org!", org);
                } else {
                    response_500(
                        res,
                        "Error occurred while creating org in DB"
                    );
                }
            }
        }
    } catch (err) {
        console.log("Error occurred while adding basic details for org: ", err);
        response_500(res, "Error occurred while creating org in DB", err);
    }
});
router.post("/register/stepTwo", async (req, res) => {
    try {
        const { email, description } = req.body;
        console.log("EMAIL: ", email);
        console.log("description: ", description);
        const checkOrg = await Organization.findOne({ email });
        if (!checkOrg) {
            response_400(res, "No such organization exists.");
        } else {
            const org = await Organization.updateOne(
                {
                    email,
                },
                { description },
                { new: true }
            );
            if (org) {
                console.log("Successfully updated org with mail: ", email);
                response_200(
                    res,
                    "Successfully updated description of org!",
                    org
                );
            } else {
                response_500(res, "Error occurred while updating org in DB");
            }
        }
    } catch (err) {
        console.log("Error occurred while updating description for org: ", err);
        response_500(
            res,
            "Error occurred while updating org's desc in DB",
            err
        );
    }
});

router.post("/register/stepThree", async (req, res) => {
    try {
        const { email } = req.body;
        const files = req.files; //logo, banner, document
        console.log("FILES: ", files);
        const check = files.filter((file) => file.size > 100000);
        if (check.length > 0) {
            response_400(res, "File sizes should be less than 100kb.");
        } else {
            const extensions = files.map((file) =>
                file.originalname.split(".").pop()
            );
            const validate = extensions.filter(
                (extension) =>
                    extension !== "jpg" &&
                    extension !== "png" &&
                    extension !== "jpeg" &&
                    extension !== "pdf"
            );

            const docUploaded = files.filter((file) =>
                file.fieldname.includes("document")
            );
            //email variable, update record in DB

            if (validate.length > 0) {
                response_400(
                    res,
                    "Invalid file format. Only .jpg, .png, .jpeg, .pdf files are allowed"
                );
            } else if (docUploaded.length === 0) {
                response_400(
                    res,
                    "Uploading document is mandatory for verification."
                );
            } else {
                // const pathToLogo = `/org/${email}/logo_${Date.now()}.jpg`;
                // const pathToBanner = `/org/${email}/banner_${Date.now()}.jpg`;
                // const pathToDocument = `/org/${email}/document_${Date.now()}.jpg`;

                const filesToUpload = [];
                const paths = {};
                for (let i = 0; i < files.length; i++) {
                    if (
                        extensions[i] === "jpg" ||
                        extensions[i] === "jpeg" ||
                        extensions[i] === "png"
                    ) {
                        paths[
                            files[i].fieldname
                                .replace("optional", "")
                                .toLowerCase()
                        ] = `org/${email}/${files[i].fieldname
                            .replace("optional", "")
                            .toLowerCase()}.jpeg`;
                    } else {
                        paths[
                            files[i].fieldname
                                .replace("optional", "")
                                .toLowerCase()
                        ] = `org/${email}/${files[i].fieldname
                            .replace("optional", "")
                            .toLowerCase()}.${extensions[i]}`;
                    }
                    if (extensions[i] === "pdf") {
                        filesToUpload.push(
                            await uploadPdf(
                                email,
                                files[i],
                                extensions[i],
                                paths
                            )
                        );
                    } else {
                        filesToUpload.push(
                            await uploadFile(email, files[i], paths)
                        );
                    }
                }

                Promise.all(filesToUpload)
                    .then((values) => {
                        console.log(values);
                    })
                    .then(async (values) => {
                        console.log("PATHS:::", paths);
                        console.log("VALUES::: ", values);
                        const org = await Organization.updateOne(
                            { email },
                            { ...paths, applyDate: new Date() }
                        );

                        response_200(
                            res,
                            "Successfully updated organization docs in DB",
                            org
                        );
                    })
                    .catch((err) => {
                        console.log(err);
                        response_500(res, "Error creating organization", err);
                    });
            }
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

router.post("/register", async (req, res) => {
    try {
        const { name, email, password, description, firebaseId } = req.body;
        const files = req.files; //logo, banner, document
        const check = files.filter((file) => file.size > 100000);
        if (check.length > 0) {
            response_400(res, "File sizes should be less than 100kb.");
        } else {
            if (!name || !email || !password) {
                throw new Error(
                    "Following fields are mandatory: name, email, password, documentToVerify"
                );
            } else {
                const extensions = files.map((file) =>
                    file.originalname.split(".").pop()
                );
                const validate = extensions.filter(
                    (extension) =>
                        extension !== "jpg" &&
                        extension !== "png" &&
                        extension !== "jpeg" &&
                        extension !== "pdf"
                );
                //email variable, update record in DB

                if (validate.length > 0) {
                    response_400(
                        res,
                        "Invalid file format. Only .jpg, .png, .jpeg, .pdf files are allowed"
                    );
                } else {
                    // const pathToLogo = `/org/${email}/logo_${Date.now()}.jpg`;
                    // const pathToBanner = `/org/${email}/banner_${Date.now()}.jpg`;
                    // const pathToDocument = `/org/${email}/document_${Date.now()}.jpg`;

                    const filesToUpload = [];
                    const paths = {};
                    for (let i = 0; i < files.length; i++) {
                        if (extensions[i] === "pdf") {
                            filesToUpload.push(
                                await uploadPdf(
                                    email,
                                    files[i],
                                    extensions[i],
                                    paths
                                )
                            );
                        } else {
                            filesToUpload.push(
                                await uploadFile(email, files[i], paths)
                            );
                        }
                    }

                    //try syncrhonously

                    Promise.all(filesToUpload)
                        .then((values) => {
                            console.log(values);
                        })
                        .then(async () => {
                            const org = await Organization.create({
                                firebaseId,
                                name,
                                email,
                                logo: `org/${email}/logo.jpeg`,
                                banner: `org/${email}/banner.jpeg`,
                                document: `org/${email}/document.pdf`,
                                description,
                                applyDate: new Date(),
                            });
                            const community = await Community.create({
                                organization: org._id,
                                orgName: org.name,
                            });
                            response_200(
                                res,
                                "Successfully created new organization in DB",
                                org
                            );
                        })
                        .catch((err) => {
                            console.log(err);
                            response_500(
                                res,
                                "Error creating organization",
                                err
                            );
                        });
                }
            }
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

export default router;
