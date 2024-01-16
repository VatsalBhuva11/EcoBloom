import express from "express";
import organizationRouter from "../controllers/organization.controllers.js";

const router = express.Router();

router.use("/", organizationRouter);

export default router;
