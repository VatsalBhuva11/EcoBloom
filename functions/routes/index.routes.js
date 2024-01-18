import filesUpload from "../middlewares/upload.middleware.js";
import registerRouter from "./auth.routes.js";
import orgRouter from "./organization.routes.js";
import userRouter from "./user.routes.js";
import express from "express";
const router = express.Router();

router.use("/auth", filesUpload, registerRouter);
router.use("/org", orgRouter);
router.use("/user", userRouter);

export default router;
