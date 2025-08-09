// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0vm298PBMnbhLaPDhrB2caqVIhCCMhek",
  authDomain: "event-connect-a3412.firebaseapp.com",
  projectId: "event-connect-a3412",
  storageBucket: "event-connect-a3412.firebasestorage.app",
  messagingSenderId: "515375992453",
  appId: "1:515375992453:web:8fc20cb46e2bee679623ec",
  measurementId: "G-QRQN96MBPH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);