import express from "express";
import userAuthRouter from "../controllers/userAuth.controllers.js";
import organizationRouter from "../controllers/orgAuth.controllers.js";
import filesUpload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.use("/user", filesUpload, userAuthRouter);
router.use("/org", filesUpload, organizationRouter);

export default router;
