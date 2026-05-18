// Import the functions we need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";

// Your web app's Firebase configuration - you provided this!
const firebaseConfig = {
  apiKey: "AIzaSyDPSaeYiP6kzYma5qGgFkLZPJ6rFjD2XfY",
  authDomain: "kingaroos-website.firebaseapp.com",
  projectId: "kingaroos-website",
  storageBucket: "kingaroos-website.firebasestorage.app",
  messagingSenderId: "188167697134",
  appId: "1:188167697134:web:be2e215d69276d35f2f9ff",
  measurementId: "G-1NMQQYM9VX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// B3 FIX: Replace getFirestore(app) with initializeFirestore using
// persistentLocalCache + persistentMultipleTabManager so that content
// survives page refreshes and idle periods via IndexedDB offline cache.
// This eliminates the blank-page-after-refresh symptom caused by a cold
// Firestore fetch that races against React rendering.
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});

export const auth = getAuth(app);
