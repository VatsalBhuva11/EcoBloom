import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Question = new Schema({
    question: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true,
    },
    correctAnswer: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
        required: true,
    },
    asked: {
        type: String,
        required: false,
    },
});

export default mongoose.model("question", Question);
