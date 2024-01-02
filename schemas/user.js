const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true, // Prevent duplicate emails
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    photoUrl: {
        type: String,
        default: "",
    },
});

module.exports = mongoose.model("user", User);
