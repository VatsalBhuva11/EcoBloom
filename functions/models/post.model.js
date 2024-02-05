import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Post = new Schema({
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
    },
    photo: String,
    content: {
        type: String,
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
export { Post };
