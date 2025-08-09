// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3kw9wZXvkv79PISAyE2pi7YZT-Kyi0LY",
  authDomain: "lost-found-66ed3.firebaseapp.com",
  projectId: "lost-found-66ed3",
  storageBucket: "lost-found-66ed3.firebasestorage.app",
  messagingSenderId: "804062759397",
  appId: "1:804062759397:web:06f4f1fb716975a784c70c",
  measurementId: "G-6JJ3Y4FWSN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);