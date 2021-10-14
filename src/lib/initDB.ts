import admin from "firebase-admin";

import serviceAccount from "./serviceAccount.js";

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: process.env.DATABASE_URL,
});

export const db = admin.database();
export const users = db.ref("users");
export const posts = db.ref("posts");
