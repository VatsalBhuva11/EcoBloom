import {
    answerQuestion,
    createQuestions,
    deleteQuestions,
    getQuestion,
    updateQuestions,
    checkUserAnswered,
} from "../controllers/question.controllers.js";
import express from "express";
import checkUser from "../middlewares/checkUser.middleware.js";

const router = express.Router();

router.post("/", createQuestions);
router.delete("/", deleteQuestions);
router.get("/", getQuestion);
router.patch("/", updateQuestions);
router.post("/checkAnswer", checkUser, answerQuestion);
router.post("/:userId/answered", checkUserAnswered);

export default router;
