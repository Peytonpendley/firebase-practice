// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnWlyCYudAMTstG-s7vVTcrdoH5vy3iy0",
  authDomain: "fir-practice-7a61a.firebaseapp.com",
  projectId: "fir-practice-7a61a",
  storageBucket: "fir-practice-7a61a.appspot.com",
  messagingSenderId: "885411945482",
  appId: "1:885411945482:web:ea7b64683a852cd8f6d3f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
// this is initializing Cloud Firestore and getting a reference to the service
export const db = getFirestore(app);