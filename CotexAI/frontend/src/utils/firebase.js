// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API ,
  authDomain: "cotex-ai.firebaseapp.com",
  projectId: "cotex-ai",
  storageBucket: "cotex-ai.firebasestorage.app",
  messagingSenderId: "818179042592",
  appId: "1:818179042592:web:343e873a48577b6da5bb45",
  measurementId: "G-H1C5JP9FJG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider=new GoogleAuthProvider()