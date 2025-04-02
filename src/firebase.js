// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnWtoNOX5MmO7GoDM5hj_096ieFvgEorc",
  authDomain: "portfolio-64df4.firebaseapp.com",
  projectId: "portfolio-64df4",
  storageBucket: "portfolio-64df4.firebasestorage.app",
  messagingSenderId: "1082930271210",
  appId: "1:1082930271210:web:8b8a9b8037fd59a3ec9893",
  measurementId: "G-RKSECWP2FW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

export { db };
