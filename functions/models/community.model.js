import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Community = new Schema({
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true,
        unique: true,
    },
    orgName: {
        type: String,
        required: true,
    },
    userCount: {
        type: Number,
        default: 0,
    },
    joinedUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});

export default mongoose.model("community", Community);
export { Community };
