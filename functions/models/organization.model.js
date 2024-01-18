import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Organization = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    logo: {
        type: String,
        required: false,
    },
    banner: {
        type: String,
        required: false,
    },
    document: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
    orgPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
    campaigns: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Campaign",
        },
    ],
});

export default mongoose.model("organization", Organization);
export { Organization };
