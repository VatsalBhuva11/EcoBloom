import express from "express";
import {
    getOrgs,
    getOrgDetails,
    updateOrgPics,
    createPost,
    linkOrgPassword,
} from "../controllers/organization.controllers.js";
import filesUpload from "../middlewares/upload.middleware.js";
import checkOrg from "../middlewares/checkOrg.middleware.js";

const router = express.Router();

//get all org details
router.get("/", getOrgs);

// specific org details
router.get("/:orgId", getOrgDetails);
router.post("/linkPassword", checkOrg, linkOrgPassword);

router.post("/post", filesUpload, checkOrg, createPost);

router.patch("/", checkOrg, filesUpload, updateOrgPics);
// router.patch("/:orgName", filesUpload, updateOrgPics);

export default router;
