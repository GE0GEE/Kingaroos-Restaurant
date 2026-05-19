import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPSaeYiP6kzYma5qGgFkLZPJ6rFjD2XfY",
  authDomain: "kingaroos-website.firebaseapp.com",
  projectId: "kingaroos-website",
  storageBucket: "kingaroos-website.firebasestorage.app",
  messagingSenderId: "188167697134",
  appId: "1:188167697134:web:be2e215d69276d35f2f9ff",
  measurementId: "G-1NMQQYM9VX",
};

const app = initializeApp(firebaseConfig);

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
