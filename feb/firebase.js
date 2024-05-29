// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "news-proj-9bd2d.firebaseapp.com",
  projectId: "news-proj-9bd2d",
  storageBucket: "news-proj-9bd2d.appspot.com",
  messagingSenderId: "922594283295",
  appId: "1:922594283295:web:68e8b6846b301b1210aa2a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);