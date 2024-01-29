import express from "express";
import { joinCommunity } from "../controllers/community.controllers.js";
import checkUser from "../middlewares/checkUser.middleware.js";

const router = express.Router();

router.post("/join/:communityId", checkUser, joinCommunity);

export default router;
