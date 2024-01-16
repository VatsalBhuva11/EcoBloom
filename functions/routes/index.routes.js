import authRouter from "./auth.routes.js";
import orgRouter from "./organization.routes.js";
import express from "express";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/org", orgRouter);

export default router;
