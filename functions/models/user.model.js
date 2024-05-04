import mongoose from "mongoose";
import Community from "./community.model.js";
import Campaign from "./campaign.model.js";
import Question from "./question.model.js";
const Schema = mongoose.Schema;

const User = new Schema({
    firebaseId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true, // Prevent duplicate emails
        required: true,
    },

    photoPathFirestore: {
        type: String,
        required: true,
        default:
            "https://firebasestorage.googleapis.com/v0/b/ecobloom-gdsc-challenge.appspot.com/o/user%2Funknown.jpg?alt=media&token=cbde7ca9-e356-4d34-90f7-1204eadff19d",
    },
    phone: {
        type: String,
        required: false,
    },
    points: {
        type: Number,
        default: 0,
    },
    registeredCampaigns: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Campaign",
        },
    ],
    completedCampaigns: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Campaign",
        },
    ],
    communities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Community",
        },
    ],
    activityLog: [
        {
            type: Object,
            //each activity is: content, date
        },
    ],
    questionsAttempted: [
        {
            question: {
                type: Schema.Types.ObjectId,
                ref: "Question",
                required: true,
            },
            optionSelected: {
                type: String,
            },
        },
    ],
});

export default mongoose.model("user", User);
export { User };
