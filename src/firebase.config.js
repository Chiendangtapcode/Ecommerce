// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB3sOqUJ_grDdu5UfbuSv_Yq84DE4QfJP8",
  authDomain: "ecommerce-5612f.firebaseapp.com",
  projectId: "ecommerce-5612f",
  storageBucket: "ecommerce-5612f.appspot.com",
  messagingSenderId: "15841420320",
  appId: "1:15841420320:web:3f4a2bd2057ae568f44845",
  measurementId: "G-JPC1JWM814"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig
