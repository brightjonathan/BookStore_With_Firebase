import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import {getAuth, GoogleAuthProvider} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyC0S0C5dWqSWEG8vFduonaRGBnkZLk1t2I", 
  authDomain: "booklibrary-5d670.firebaseapp.com",
  projectId: "booklibrary-5d670",
  storageBucket: "booklibrary-5d670.appspot.com",
  messagingSenderId: "344008843181",
  appId: "1:344008843181:web:4468d541ca2a3a37e54b24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // for authenticating a user
export const provider = new GoogleAuthProvider(); //signing in with google
export const db = getFirestore(app); // for storing data into firestore 



