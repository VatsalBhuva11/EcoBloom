import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.config.js";
import router from "./routes/index.routes.js";
import { onRequest } from "firebase-functions/v2/https";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();
// https://us-central1-ecobloom-gdsc-challenge.cloudfunctions.net/api
app.get("/", (req, res) => {
    const message = "EcoBloom API";
    res.json(message);
});

app.use("/", router);

export const api = onRequest({ cors: true }, app);
