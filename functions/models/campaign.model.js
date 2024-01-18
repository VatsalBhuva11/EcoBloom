import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Campaign = new Schema({
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true,
    },
    registeredUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    verifiedUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
        default: null,
    },
    status: {
        type: String,
        enum: ["UPCOMING", "COMPLETED"],
        required: true,
        default: "UPCOMING",
    },
    type: {
        type: String,
        enum: [
            "LAKE",
            "RIVER",
            "SEA",
            "OCEAN",
            "BEACH",
            "PARK",
            "FOREST",
            "MOUNTAIN",
            "OTHER",
        ],
        required: true,
    },
});

export default mongoose.model("campaign", Campaign);
export { Campaign };
