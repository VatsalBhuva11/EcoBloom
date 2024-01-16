import express from "express";
import userRouter from "../controllers/user.controllers.js";

const router = express.Router();

router.use("/", userRouter);

export default router;
