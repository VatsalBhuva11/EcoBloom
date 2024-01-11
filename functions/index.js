import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.config.js";
import router from "./routes/index.routes.js";
import { onRequest } from "firebase-functions/v2/https";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import firebaseConfig from "./config/firebase.config.js";
dotenv.config();

const app = express();
initializeApp(firebaseConfig);
const storage = getStorage();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
// https://us-central1-ecobloom-gdsc-challenge.cloudfunctions.net/api
app.get("/", (req, res) => {
    const message = "EcoBloom API";
    res.json(message);
});

app.use("/", router);

export const api = onRequest({ cors: true }, app);
export { storage };
