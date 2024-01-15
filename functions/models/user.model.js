import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = new Schema({
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
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
});

export default mongoose.model("user", User);
