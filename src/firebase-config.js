// Import the functions we need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration - you provided this!
const firebaseConfig = {
  apiKey: "AIzaSyDPSaeYiP6kzYma5qGgFkLZPJ6rFjD2XfY",
  authDomain: "kingaroos-website.firebaseapp.com",
  projectId: "kingaroos-website",
  storageBucket: "kingaroos-website.firebasestorage.app",
  messagingSenderId: "188167697134",
  appId: "1:188167697134:web:be2e215d69276d35f2f9ff",
  measurementId: "G-1NMQQYM9VX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the services we need and export them
// This makes them available to other parts of your app
export const db = getFirestore(app);
export const auth = getAuth(app);

