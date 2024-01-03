import express from "express";
import User from "../models/user.model.js";
const router = express.Router();

// Create a new user
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({
            name,
            email,
            password,
        });
        console.log("Successfully created new user in DB!");
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
});

export default router;
