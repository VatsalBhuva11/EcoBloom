import express from "express";
import userAuthRouter from "../controllers/userAuth.controllers.js";
import filesUpload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.use("/user", filesUpload, userAuthRouter);

export default router;
