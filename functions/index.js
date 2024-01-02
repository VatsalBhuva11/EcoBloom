const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db.config.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// https://us-central1-ecobloom-gdsc-challenge.cloudfunctions.net/api
app.get("/", (req, res) => {
    res.send("EcoBloom API");
});

// https://us-central1-ecobloom-gdsc-challenge.cloudfunctions.net/api/test
app.get("/test", (req, res) => {
    res.send("Hello from Firebase!");
});

exports.api = functions.https.onRequest(app);
