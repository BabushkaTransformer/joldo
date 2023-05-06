// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLuvCCCLXXYaoqWNyeuNswL7nxoriYa6Y",
  authDomain: "jorgo-6c582.firebaseapp.com",
  projectId: "jorgo-6c582",
  storageBucket: "jorgo-6c582.appspot.com",
  messagingSenderId: "122467222482",
  appId: "1:122467222482:web:510c3f47d342f64f363e0b",
  measurementId: "G-KZ9DGSF39F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
