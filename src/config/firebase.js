// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAYogr6EGje_ih8Fi9NyRXh0w-weFFnFNA",
  authDomain: "tasker-1-6bb98.firebaseapp.com",
  projectId: "tasker-1-6bb98",
  storageBucket: "tasker-1-6bb98.appspot.com",
  messagingSenderId: "577362752796",
  appId: "1:577362752796:web:97ec497dd59f8dc024f6d9",
  measurementId: "G-480Y9CJ6BY"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);