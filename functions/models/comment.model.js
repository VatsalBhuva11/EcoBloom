import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Comment = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});

export default mongoose.model("comment", Comment);
