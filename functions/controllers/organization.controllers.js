import express from "express";
import Organization from "../models/organization.model.js";
import {
    response_200,
    response_400,
    response_404,
    response_500,
} from "../utils/responseCodes.js";
import Community from "../models/community.model.js";
import Campaign from "../models/campaign.model.js";
import filesUpload from "../middlewares/upload.middleware.js";
import { storage } from "../index.js";
import { ref, uploadBytesResumable } from "firebase/storage";
import checkOrg from "../middlewares/checkOrg.middleware.js";

const router = express.Router();

//for organization profile
router.get("/:orgName", async (req, res) => {
    try {
        const orgName = req.params.orgName;
        const org = await Organization.findOne({ name: orgName });
        if (!org || !org.isVerified) {
            response_404(
                res,
                "The organization is not yet registered with us."
            );
        } else {
            const { name, email, logo, banner, orgPosts } = org;
            const communityData = await Community.findOne({
                organization: org.id,
            });
            const campaigns = await Campaign.findMany({
                organization: org.id,
            });
            const upcomingCampaigns = campaigns.filter(
                (campaign) => campaign.status === "upcoming"
            );
            const completedCampaigns = campaigns.filter(
                (campaign) => campaign.status === "completed"
            );

            let data = {
                name,
                email,
                logo,
                banner,
                orgPosts,
                upcomingCampaigns,
                completedCampaigns,
                communityUsersCount: communityData.userCount,
            };
            response_200(res, "Successfully fetched organization data!", data);
        }
    } catch (err) {
        console.log(err);
        response_500(
            res,
            "Error occurred while fetching organization details",
            err
        );
    }
});

//updating the organization's details (logo, banner only possible)
router.patch("/:orgName", checkOrg, filesUpload, async (req, res) => {
    const files = req.files; //logo, banner
    const extensions = files.map((file) => file.originalname.split(".").pop());
    const validate = extensions.filter(
        (extension) =>
            extension !== "jpg" && extension !== "png" && extension !== "jpeg"
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
        for (let i = 0; i < files.length; i++) {
            filesToUpload.push(
                uploadFile(req.org.email, files[i], extensions[i], paths)
            );
        }

        Promise.all(filesToUpload)
            .then((values) => {
                console.log(values);
            })
            .then(async () => {
                const doc = await Organization.findOneAndUpdate(
                    {
                        email: req.org.email,
                    },
                    {
                        logo: paths["logo"],
                        banner: paths["banner"],
                    },
                    {
                        new: true,
                    }
                );

                console.log("Successfully updated organization details!");
                response_200(
                    res,
                    "Successfully updated organization details!",
                    doc
                );
            })
            .catch((err) => {
                console.log(err);
                response_500(res, "Error creating organization", err);
            });
    }
});

async function uploadFile(email, file, extensions, paths) {
    const fileType = file.fieldname.toLowerCase().replace("optional", "");
    const pathToFile = `/org/${email}/${fileType}.${extensions}`;
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

export default router;
