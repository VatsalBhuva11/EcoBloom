import {
    answerQuestion,
    createQuestions,
    deleteQuestions,
    getQuestion,
    updateQuestions,
} from "../controllers/question.controllers.js";
import express from "express";
import checkUser from "../middlewares/checkUser.middleware.js";

const router = express.Router();

router.post("/", createQuestions);
router.delete("/", deleteQuestions);
router.get("/", getQuestion);
router.patch("/", updateQuestions);
router.post("/checkAnswer", checkUser, answerQuestion);

export default router;
