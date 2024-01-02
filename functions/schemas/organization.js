const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Organization = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    banner: {
        type: String,
        required: true,
    },
    documents: {
        type: Array,
        required: true,
        default: [],
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
    campaigns: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Campaign",
        },
    ],
});

module.exports = mongoose.model("organization", Organization);
