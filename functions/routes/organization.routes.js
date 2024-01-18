import express from "express";
import {
    getOrgDetails,
    updateOrgPics,
} from "../controllers/organization.controllers.js";
import filesUpload from "../middlewares/upload.middleware.js";
// import checkOrg from "../middlewares/checkOrg.middleware.js";

const router = express.Router();

//
router.get("/:orgName", getOrgDetails);

// router.patch("/:orgName", checkOrg, filesUpload, updateOrgPics);
router.patch("/:orgName", filesUpload, updateOrgPics);

export default router;
