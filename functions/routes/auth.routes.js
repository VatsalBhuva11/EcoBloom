import express from "express";
import userAuthRouter from "../controllers/userAuth.controllers.js";
import organizationRouter from "../controllers/orgAuth.controllers.js";

const router = express.Router();

router.use("/user", userAuthRouter);
router.use("/org", organizationRouter);

export default router;
