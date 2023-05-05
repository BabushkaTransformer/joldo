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
  apiKey: "AIzaSyC5kOomTarGaXFyOHg3MffKbHw2eyoIvw4",
  authDomain: "bella-app-6fea8.firebaseapp.com",
  databaseURL: "https://bella-app-6fea8-default-rtdb.firebaseio.com",
  projectId: "bella-app-6fea8",
  storageBucket: "bella-app-6fea8.appspot.com",
  messagingSenderId: "520136556734",
  appId: "1:520136556734:web:621638e500090d46e15eef",
  measurementId: "G-JG7Z1X8952"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
