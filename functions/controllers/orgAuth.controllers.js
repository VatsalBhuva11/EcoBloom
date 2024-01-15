import express from "express";
import Organization from "../models/organization.model.js";
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
async function uploadFile(email, fileType, file, extensions, paths) {
    const pathToFile = `/org/${email}/${fileType}_${Date.now()}.${extensions}`;
    const storageRef = ref(storage, pathToFile);
    const metadata = {
        contentType: file.mimetype,
    };

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

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const files = req.files; //logo, banner, document
        const extensions = files.map((file) =>
            file.originalname.split(".").pop()
        );
        const validate = extensions.filter(
            (extension) =>
                extension !== "jpg" &&
                extension !== "png" &&
                extension !== "jpeg"
        );
        //email variable, update record in DB

        if (validate.length > 0) {
            response_400(
                res,
                "Invalid file format. Only .jpg, .png, .jpeg files are allowed"
            );
        } else {
            // const pathToLogo = `/org/${email}/logo_${Date.now()}.jpg`;
            // const pathToBanner = `/org/${email}/banner_${Date.now()}.jpg`;
            // const pathToDocument = `/org/${email}/document_${Date.now()}.jpg`;

            const filesToUpload = [];
            const paths = {};
            for (let i = 0; i < 3; i++) {
                filesToUpload.push(
                    uploadFile(
                        email,
                        i === 0 ? "logo" : i === 1 ? "banner" : "document",
                        files[i],
                        extensions[i],
                        paths
                    )
                );
            }

            Promise.all(filesToUpload)
                .then((values) => {
                    console.log(values);
                })
                .then(async () => {
                    const org = await Organization.create({
                        name,
                        email,
                        password,
                        logo: paths["logo"],
                        banner: paths["banner"],
                        document: paths["document"],
                    });
                    console.log("Successfully created new organization in DB!");
                    response_200(
                        res,
                        "Successfully created new organization in DB",
                        org
                    );
                })
                .catch((err) => {
                    console.log(err);
                    response_500(res, "Error creating organization", err);
                });
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

export default router;
