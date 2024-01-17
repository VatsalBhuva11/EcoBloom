import * as dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
dotenv.config();

const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.BUCKET_ID,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
};
initializeApp(config);

const storage = getStorage();

export default config;
export { storage };
