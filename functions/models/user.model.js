import mongoose from "mongoose";
import Community from "./community.model.js";
import Campaign from "./campaign.model.js";
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
});

export default mongoose.model("user", User);
export { User };
