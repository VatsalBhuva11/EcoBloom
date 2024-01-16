import mongoose from "mongoose";
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

export default mongoose.model("post", Post);
