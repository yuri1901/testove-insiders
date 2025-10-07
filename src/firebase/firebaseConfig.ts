import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVhO3eTRZIran_iGNMaJzrY754h4eIAg8",
  authDomain: "test-task-83d98.firebaseapp.com",
  projectId: "test-task-83d98",
  storageBucket: "test-task-83d98.firebasestorage.app",
  messagingSenderId: "745577856911",
  appId: "1:745577856911:web:75fdc99b351186c46155fa",
  measurementId: "G-WGQ0W4XJK6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
