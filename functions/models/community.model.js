import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Community = new Schema({
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true,
        unique: true,
    },
    joinedUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    orgPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
    userPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
});

export default mongoose.model("community", Community);
