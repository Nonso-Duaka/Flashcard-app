// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrCMdCG47-bemvpedQkpYpUURM6Em1Gm8",
  authDomain: "flashcards-e9df5.firebaseapp.com",
  projectId: "flashcards-e9df5",
  storageBucket: "flashcards-e9df5.appspot.com",
  messagingSenderId: "814673062287",
  appId: "1:814673062287:web:32e208d8235cffa3f2c3fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const db = getFirestore(app);
