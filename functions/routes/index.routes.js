import authRouter from "./auth.routes.js";
import orgRouter from "./organization.routes.js";
import userRouter from "./user.routes.js";
import express from "express";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/org", orgRouter);
router.use("/user", userRouter);

export default router;
