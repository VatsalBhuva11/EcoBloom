import dotenv from "dotenv";
import { initializeApp as initializeAdminApp } from "firebase-admin/app";
import { createRequire } from "module";
import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";
const require = createRequire(import.meta.url);

dotenv.config();
var serviceAccount = require("../ecobloom-gdsc-challenge-firebase-adminsdk-q3jdk-fbc4c3ffe2.json");

const adminApp = initializeAdminApp({
    credential: admin.credential.cert(serviceAccount),
});
const auth = getAuth(adminApp);
const storage = getStorage(adminApp);

export { adminApp, auth, storage };
