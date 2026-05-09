// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDavfOiy1h41PuBpiGPwdVmAh7km7_BJio",
  authDomain: "test-c8be2.firebaseapp.com",
  projectId: "test-c8be2",
  storageBucket: "test-c8be2.firebasestorage.app",
  messagingSenderId: "144031863688",
  appId: "1:144031863688:web:9ae7280bf6b8d70824603d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);