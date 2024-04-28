import {
    createQuestions,
    deleteQuestions,
    getQuestion,
    updateQuestions,
} from "../controllers/question.controllers.js";
import express from "express";

const router = express.Router();

router.post("/", createQuestions);
router.delete("/", deleteQuestions);
router.get("/", getQuestion);
router.patch("/", updateQuestions);

export default router;
