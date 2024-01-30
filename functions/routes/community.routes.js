import express from "express";
import {
    getCommunity,
    joinCommunity,
} from "../controllers/community.controllers.js";
import checkUser from "../middlewares/checkUser.middleware.js";

const router = express.Router();

router.get("/:orgId", getCommunity);

router.post("/join/:orgId", checkUser, joinCommunity);

export default router;
