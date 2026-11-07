import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWxwVlNr9mNkb7Mxrp8swIWv27J6zPYkE",
  authDomain: "hulton-bank.firebaseapp.com",
  projectId: "hulton-bank",
  storageBucket: "hulton-bank.firebasestorage.app",
  messagingSenderId: "638350406291",
  appId: "1:638350406291:web:16116e62967415957c9366",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);