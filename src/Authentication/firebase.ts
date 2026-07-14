import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjmQEVuvC6UPjzhMS_zvyUkv1AFPS0VCo",
  authDomain: "exclusive-75c4f.firebaseapp.com",
  projectId: "exclusive-75c4f",
  storageBucket: "exclusive-75c4f.firebasestorage.app",
  messagingSenderId: "66166741003",
  appId: "1:66166741003:web:b2b1d8a4ce5373ba57cf0e",
  measurementId: "G-QRLSYK1VYB",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);