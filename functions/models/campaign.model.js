import mongoose from "mongoose";
import Organization from "./organization.model.js";

const Schema = mongoose.Schema;

const Campaign = new Schema({
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    goal: {
        type: String,
        required: true,
        default: "Let's clean the world together!",
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
    registeredUsersCount: {
        type: Number,
        required: true,
        default: 0,
    },
    verifiedUsersCount: {
        type: Number,
        required: true,
        default: 0,
    },
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
        required: false,
    },
    longitude: {
        type: Number,
        required: false,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        default: null,
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false,
    },
    points: {
        type: Number,
        required: true,
        default: 50,
    },
    guidelines: {
        type: String,
        required: true,
        default:
            "Respectful conduct towards all participants. In case of any disputes or issues, the organizing committee's decision will be considered final.",
    },
    locationType: {
        type: String,
        enum: [
            "Lake",
            "River",
            "Sea",
            "Ocean",
            "City",
            "Beach",
            "Park",
            "Forest",
            "Mountain",
            "Other",
        ],
        required: true,
    },
});

//set default campaign name to the organization's name
Campaign.pre("validate", async function (next) {
    if (!this.name) {
        const org = await Organization.findById(this.organization);
        this.name = org.name;
    }
    next();
});

export default mongoose.model("campaign", Campaign);
export { Campaign };
