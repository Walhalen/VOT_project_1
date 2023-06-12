// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAa-K8lGRVHTaNTT9wixqtJr8rwve4OHF0",
  authDomain: "vot-tasker.firebaseapp.com",
  projectId: "vot-tasker",
  storageBucket: "vot-tasker.appspot.com",
  messagingSenderId: "921221906584",
  appId: "1:921221906584:web:242ebf6a2af645e0b8d0ed",
  measurementId: "G-RWJS34Z0PD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);