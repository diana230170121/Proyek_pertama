import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdE1ULGVlrxCG7HKYr4asORpn3W54zffU",
  authDomain: "login-aman-firebase.firebaseapp.com",
  projectId: "login-aman-firebase",
  storageBucket: "login-aman-firebase.appspot.com",
  messagingSenderId: "853692661637",
  appId: "1:853692661637:web:e864812db22e9628d33588"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
