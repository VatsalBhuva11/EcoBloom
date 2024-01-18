import filesUpload from "../middlewares/upload.middleware.js";
import registerRouter from "./auth.routes.js";
import orgRouter from "./organization.routes.js";
import userRouter from "./user.routes.js";
import express from "express";
import checkUser from "../middlewares/checkOrg.middleware.js";
const router = express.Router();

router.use("/auth", filesUpload, registerRouter);
router.use("/org", orgRouter);
router.use("/user", userRouter);
router.get("/testMiddleware", checkUser, async (req, res) => {
    try {
        res.json("OK");
    } catch (err) {
        res.json("ERROR");
    }
});

export default router;
