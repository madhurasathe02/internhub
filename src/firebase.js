// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAtUCwQ19hvTwWJ6Nc4Tn1DfvKT2CDl4to",
    authDomain: "internhub-72453.firebaseapp.com",
    projectId: "internhub-72453",
    storageBucket: "internhub-72453.firebasestorage.app",
    messagingSenderId: "632157772438",
    appId: "1:632157772438:web:9612384a969c156bf400b7",
    measurementId: "G-R8K39R7RSJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);