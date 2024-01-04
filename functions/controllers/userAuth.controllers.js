import express from "express";
import User from "../models/user.model.js";
import filesUpload from "../middlewares/upload.middleware.js";

const router = express.Router();

// Create a new user
router.post("/register", filesUpload, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const profile = req.files[0];
        console.log(req.files[0]);
        console.log(name, email, password, profile.originalname);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

export default router;

// const { name, email, password } = req.body;

// const user = await User.create({
//     name,
//     email,
//     password,
// });
// console.log("Successfully created new user in DB!");
// res.json(user);
