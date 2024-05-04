import express from "express";
import {
    getCommunity,
    joinCommunity,
    leaveCommunity,
} from "../controllers/community.controllers.js";
import checkUser from "../middlewares/checkUser.middleware.js";

const router = express.Router();

router.get("/:orgId", getCommunity);

router.post("/join/:orgId", checkUser, joinCommunity);
router.post("/leave/:orgId", checkUser, leaveCommunity);

export default router;
