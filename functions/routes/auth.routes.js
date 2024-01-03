import express from "express";
import userAuthRouter from "../controllers/userAuth.controllers.js";
const router = express.Router();

router.use("/user", userAuthRouter);

export default router;
