// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmv7wPUBelxBdgEEINtG6yB2p38x1slj0",
  authDomain: "portfolio-f532d.firebaseapp.com",
  projectId: "portfolio-f532d",
  storageBucket: "portfolio-f532d.firebasestorage.app",
  messagingSenderId: "859012062143",
  appId: "1:859012062143:web:b72fe8f51f348147911f0a",
  measurementId: "G-QGCJ2CFTL2",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);

const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db, analytics };
