// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcX0W2AeioCoblsaqoGZ0U6wsYxGWjgnE",
  authDomain: "e-commerce-6aa54.firebaseapp.com",
  projectId: "e-commerce-6aa54",
  storageBucket: "e-commerce-6aa54.appspot.com",
  messagingSenderId: "222981030974",
  appId: "1:222981030974:web:5b2bd6f7128d31dfb9bd6f",
  measurementId: "G-E78TKFX15G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB,auth}