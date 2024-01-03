import express from "express";
import User from "../models/user.model.js";
const router = express.Router();

// Create a new user
router.post("/register", async (req, res) => {
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        console.log("Successfully created new user in DB!");
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
});

export default router;
