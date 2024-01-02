const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community",
        required: true,
    },
    photos: [String],
    content: {
        type: String,
        required: true,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
    date: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model("post", Post);
