// import "dotenv/config";
// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_firebase_API_KEY,
  authDomain: import.meta.env.VITE_firebase_auth_domain,
  projectId: import.meta.env.VITE_firebase_project_ID,
  storageBucket: import.meta.env.VITE_firebase_storage_bucket,
  messagingSenderId: import.meta.env.VITE_firebase_messaging_sender_ID,
  appId: import.meta.env.VITE_firebase_app_ID,
  measurementId: import.meta.env.VITE_firebase_measurament_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
//const analytics = getAnalytics(app);

const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
