import Question from "../models/question.model.js";
import User from "../models/user.model.js";
import {
    response_200,
    response_404,
    response_500,
} from "../utils/responseCodes.js";

export const createQuestions = async (req, res) => {
    try {
        const { questions } = req.body;
        console.log(questions[0]);
        const result = await Question.insertMany(questions);
        return response_200(
            res,
            "Successfully inserted new set of questions!",
            result
        );
    } catch (err) {
        return response_500(
            res,
            "Error occurred while putting in new questions",
            err
        );
    }
};

export const deleteQuestions = async (req, res) => {
    try {
        const result = await Question.deleteMany();
        return response_200(res, "Successfully deleted all questions!", result);
    } catch (err) {
        return response_500(
            res,
            "Error occurred while deleting all questions",
            err
        );
    }
};

let selectedQuestion = null;
let lastRefreshDate = null;
const refreshQuestion = async () => {
    // Check if it's a new day (12 AM UTC)
    const now = new Date();
    const todayUTC = new Date(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        0,
        0,
        0
    );
    if (lastRefreshDate === null || todayUTC > lastRefreshDate) {
        const randomQuestion = await Question.findOne({ status: false });
        randomQuestion.status = true;
        randomQuestion.asked = new Date().toISOString();
        const response = await randomQuestion.save();
        selectedQuestion = randomQuestion;
        lastRefreshDate = todayUTC;
    }
};

export const getQuestion = async (req, res) => {
    console.log("selectedQuestion: ", selectedQuestion);
    try {
        const now = new Date();
        const todayUTC = new Date(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            0,
            0,
            0
        );
        if (todayUTC <= lastRefreshDate) {
            if (!selectedQuestion) {
                await refreshQuestion();
            }
        } else {
            await refreshQuestion();
        }
        response_200(
            res,
            "Successfully fetched current question",
            selectedQuestion
        );
    } catch (err) {
        return response_500(
            res,
            "Error occurred while fetching new question",
            err
        );
    }
};

export const updateQuestions = async (req, res) => {
    try {
        const changes = req.query;
        const questions = await Question.find();
        let questionPromises = [];
        questions.forEach((question) => {
            // Update each question with the changes
            const updatedQuestion = { ...question._doc, ...changes }; // Apply changes to a copy of the question object
            questionPromises.push(
                question.updateOne(updatedQuestion, { new: true }) // Use updateOne to update the question in the database
            );
        });
        Promise.all(questionPromises)
            .then(() => {
                response_200(res, "Successfully made changes to questions");
            })
            .catch((err) => {
                console.log(err);
                return response_500(
                    res,
                    "Error occurred while making changes in questions",
                    err
                );
            });
    } catch (err) {
        console.log(err);
        return response_500(
            res,
            "Error occurred while making changes in questions",
            err
        );
    }
};

export const answerQuestion = async (req, res) => {
    try {
        const userId = req.user.userId;
        //send question also incase session open when question being reset
        const { option, question } = req.body;
        console.log("BODY: ", req.body);
        if (question.correctAnswer === option) {
            const updated = await User.findByIdAndUpdate(
                userId,
                {
                    $inc: { points: 5 },
                },
                { new: true }
            );
            response_200(res, "correct answer", updated);
        } else {
            response_200(res, "incorrect answer", { data: null });
        }
    } catch (err) {
        console.log(err);
        response_500(res, "Error occurred while marking answer for user", err);
    }
};
