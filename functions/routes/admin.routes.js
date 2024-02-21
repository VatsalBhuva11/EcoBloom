import express from "express";
import { verifyOrg } from "../controllers/admin.controllers.js";
import checkAdmin from "../middlewares/checkAdmin.middleware.js";

const router = express.Router();

router.post("/verify", checkAdmin, verifyOrg);

export default router;
