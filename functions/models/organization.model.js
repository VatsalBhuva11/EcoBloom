import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Organization = new Schema({
    firebaseId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    applyDate: {
        type: Date,
        required: true,
        default: new Date(),
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        default:
            "We are committed towards making this world a better place for everyone!",
    },
    logo: {
        type: String,
        required: false,
        default:
            "https://firebasestorage.googleapis.com/v0/b/ecobloom-gdsc-challenge.appspot.com/o/user%2Funknown.jpg?alt=media&token=cbde7ca9-e356-4d34-90f7-1204eadff19d",
    },
    banner: {
        type: String,
        required: false,
        default:
            "https://firebasestorage.googleapis.com/v0/b/ecobloom-gdsc-challenge.appspot.com/o/org%2Fspring-green-fields-landscape-with-mountain-blue-sky-and-clouds-background-panorama-peaceful-rural-nature-in-springtime-with-green-grass-land-cartoon-illustration-for-spring-and-summer-banner-vector.jpg?alt=media&token=cb7f0718-af0d-44ad-9af1-da7179bf39f7",
    },
    document: {
        type: String,
        required: false,
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
