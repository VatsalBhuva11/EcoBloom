const mongoose = require("mongoose");
module.exports = async function connectDB() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Database Successfully! 🎉");
};
